import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { RPC_URL, ZHIEN_Network, Token_Contract, Token_ABI } from "./config";

interface TransactionResponse {
  hash: string;
  blockNumber?: number;
  from: string;
  timestamp: number;
  amount: number;
}

interface WalletContextType {
  mnemonic: string | null;
  setMnemonic: (mnemonic: string | null) => void;
  address: string | null;
  balance: number | null;
  importWallet: () => Promise<void>;
  transactions: TransactionResponse[];
}

const WalletContext = createContext<WalletContextType>({
  mnemonic: null,
  setMnemonic: () => {},
  address: null,
  balance: null,
  importWallet: async () => {},
  transactions: [],
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  const importWallet = async () => {
    if (mnemonic) {
      try {
        const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ZHIEN_Network);
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  
        setAddress(wallet.address);
  
        const contract = new ethers.Contract(Token_Contract, Token_ABI, provider);
  
        const walletBalance = await contract.balanceOf(wallet.address);
  
        setBalance(walletBalance.toNumber());
  
        // 查询过往全部区块中的与代币合约相关的交易信息
        const allTransactions: TransactionResponse[] = [];
        const latestBlockNumber = await provider.getBlockNumber();
        const startBlockNumber = 0;
        for (let i = startBlockNumber; i <= latestBlockNumber; i++) {
          const block = await provider.getBlock(i);
          const blockTransactions = block.transactions;
  
          for (const txHash of blockTransactions) {
            const transaction = await provider.getTransaction(txHash);
            // 获取代币合约中代币类型
            const tokenContract = new ethers.Contract(Token_Contract, Token_ABI, provider);
            const tokenSymbol = await tokenContract.symbol();
  
            // 检查交易中的代币是否符合 ZHEN 类型
            if (tokenSymbol === "ZHEN") {
              const transactionDetails: TransactionResponse = {
                hash: transaction.hash,
                blockNumber: transaction.blockNumber,
                from: transaction.from,
                timestamp: Date.now(), // 使用当前时间作为交易时间
                amount: parseFloat(ethers.utils.formatUnits(transaction.value, "ether")), // 将代币转换为数字
              };
              allTransactions.push(transactionDetails);
            }
          }
        }
        setTransactions(allTransactions);
  
      } catch (error) {
        console.error("Error importing wallet:", error);
        setAddress(null);
        setBalance(null);
      }
    }
  };
    

  useEffect(() => {
    importWallet();
    const interval = setInterval(() => {
      if (address) {
        // 每隔10秒更新添加关于这个地址上产生的新交易信息
        importWallet();
        fetchLatestTransactions();
      }
    }, 10000); // 每隔10秒执行一次

    return () => clearInterval(interval);
  }, [mnemonic, address]);

  // 修改 fetchLatestTransactions 函数中的逻辑
const fetchLatestTransactions = async () => {
  if (address) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ZHIEN_Network);
      const latestBlockNumber = await provider.getBlockNumber();

      // 获取代币合约
      const tokenContract = new ethers.Contract(Token_Contract, Token_ABI, provider);

      // 监听代币合约的 Transfer 事件
      tokenContract.on("Transfer", (from, to, amount, event) => {
        // 确保事件中涉及的地址是当前钱包地址
        if (from === address || to === address) {
          const transactionDetails: TransactionResponse = {
            hash: event.transactionHash,
            blockNumber: event.blockNumber,
            from: from,
            timestamp: Date.now(), // 使用当前时间作为交易时间
            amount: amount.toNumber(), // 将代币转换为数字
          };
          setTransactions(prevTransactions => [...prevTransactions, transactionDetails]);
        }
      });

      // 获取最新的区块
      const latestBlock = await provider.getBlock(latestBlockNumber);

      // 获取最新区块中的交易
      const blockTransactions = latestBlock.transactions;

      // 更新交易列表
      const newTransactions: TransactionResponse[] = [];
      for (const txHash of blockTransactions) {
        const transaction = await provider.getTransaction(txHash);
        const receipt = await provider.getTransactionReceipt(txHash);

        // 确保交易的接收者是当前钱包地址，并且交易是针对代币合约的
        if (receipt && receipt.to === Token_Contract) {
          const transactionDetails: TransactionResponse = {
            hash: transaction.hash,
            blockNumber: transaction.blockNumber,
            from: transaction.from,
            timestamp: Date.now(), // 使用当前时间作为交易时间
            amount: receipt ? parseFloat(receipt.logs[0].data) : 0, // 从日志中提取代币数量
          };
          newTransactions.push(transactionDetails);
        }
      }

      setTransactions(prevTransactions => [...prevTransactions, ...newTransactions]);
    } catch (error) {
      console.error("Error fetching latest transactions:", error);
    }
  }
};

  

  return (
    <WalletContext.Provider value={{ mnemonic, setMnemonic, address, balance, importWallet, transactions }}>
      {children}
    </WalletContext.Provider>
  );
};


export const useWallet = () => useContext(WalletContext);