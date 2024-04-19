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
  
        // 仅在钱包余额发生变化时更新状态
        if (walletBalance.toNumber() !== balance) {
          setBalance(walletBalance.toNumber());
        }
  
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
              const receipt = await provider.getTransactionReceipt(txHash);
              const transactionDetails: TransactionResponse = {
                hash: transaction.hash,
                blockNumber: transaction.blockNumber,
                from: transaction.from,
                timestamp: block.timestamp,
                amount: receipt ? parseFloat(receipt.logs[0].data) : 0, // 从日志中提取代币数量
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
    const interval = setInterval(importWallet);

    return () => clearInterval(interval);
  }, [mnemonic, address]);

  return (
    <WalletContext.Provider value={{ mnemonic, setMnemonic, address, balance, importWallet, transactions }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
