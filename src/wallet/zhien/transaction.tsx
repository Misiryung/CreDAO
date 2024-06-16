import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { RPC_URL, ZHIEN_Network, CASP, CASP_ABI } from "./config";

interface TransactionResponse {
  hash: string;
  blockNumber?: number;
  from: string;
  to: string;
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
  
        const contract = new ethers.Contract(CASP, CASP_ABI, provider);

        const walletBalance = await contract.balanceOf(wallet.address);
        setBalance(walletBalance.toNumber());
  
      } catch (error) {
        console.error("导入钱包时出错:", error);
        setAddress(null);
        setBalance(null);
      }
    }
  };

  useEffect(() => {
    importWallet();
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ZHIEN_Network);
    let tokenContract: ethers.Contract;

    if (address) {
      tokenContract = new ethers.Contract(CASP, CASP_ABI, provider);
      
      const handleTransfer = async (from: string, to: string, amount: ethers.BigNumber, event: any) => {
        if (from === address || to === address) {
          try {
              const transactionDetails = {
                hash: event.transactionHash,
                blockNumber: event.blockNumber,
                from: from,
                to: to,
                timestamp: Date.now(),
                amount: amount.toNumber(),
              };
              setTransactions(prevTransactions => [...prevTransactions, transactionDetails]);
              await importWallet();
          } catch (error) {
            console.error("获取交易区块信息时出错:", error);
          }
        }
      };

      // 注册事件监听器
      tokenContract.on("Transfer", handleTransfer);

      return () => {
        // 组件卸载时移除事件监听器
        if (tokenContract) {
          tokenContract.removeListener("Transfer", handleTransfer);
        }
      };
    }
  }, [mnemonic, balance]);

  return (
    <WalletContext.Provider value={{ mnemonic, setMnemonic, address, balance, importWallet, transactions }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
