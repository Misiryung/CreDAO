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
  privateKey: string | null;
  setPrivateKey: (privateKey: string | null) => void;
  address: string | null;
  balance: number | null;
  importWallet: () => Promise<void>;
  transactions: TransactionResponse[];
  gasPrice: string | null;
  sendTransaction: (amount: number, toAddress: string) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  mnemonic: null,
  setMnemonic: () => {},
  privateKey: null,
  setPrivateKey: () => {},
  address: null,
  balance: null,
  importWallet: async () => {},
  transactions: [],
  gasPrice: null,
  sendTransaction: async () => {},
});

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [walletInstance, setWalletInstance] = useState<{
    wallet: ethers.Wallet;
    provider: ethers.providers.JsonRpcProvider;
  } | null>(null);

  const importWallet = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ZHIEN_Network);
      let wallet: ethers.Wallet;

      if (mnemonic) {
        wallet = ethers.Wallet.fromMnemonic(mnemonic);
      } else if (privateKey) {
        wallet = new ethers.Wallet(privateKey);
      } else {
        throw new Error("没有提供有效的助记词或私钥");
      }

      const connectedWallet = wallet.connect(provider);
      setWalletInstance({ wallet: connectedWallet, provider });
      setAddress(connectedWallet.address);

      const contract = new ethers.Contract(CASP, CASP_ABI, provider);
      const walletBalance = await contract.balanceOf(connectedWallet.address);
      setBalance(walletBalance.toNumber());
    } catch (error) {
      console.error("导入钱包时出错:", error);
      setAddress(null);
      setBalance(null);
    }
  };

  const sendTransaction = async (amount: number, toAddress: string) => {
    if (!walletInstance) {
      console.error("钱包实例不存在");
      return;
    }

    try {
      const { wallet } = walletInstance;
      const contract = new ethers.Contract(CASP, CASP_ABI, wallet);

      const tx = await contract.transfer(
        toAddress,
        ethers.utils.parseUnits(amount.toString(), 8),
        {
          gasLimit: ethers.utils.hexlify(200000),
        }
      );
      console.log("交易发送:", tx);
      await tx.wait();
      console.log("交易确认:", tx);
    } catch (error) {
      console.error("交易失败", error);
    }
  };

  useEffect(() => {
    importWallet();

    const provider = new ethers.providers.JsonRpcProvider(
      RPC_URL,
      ZHIEN_Network
    );
    let tokenContract: ethers.Contract;

    const fetchGasPrice = async () => {
      try {
        const price = await provider.getGasPrice();
        setGasPrice(ethers.utils.formatUnits(price, "gwei"));
      } catch (error) {
        console.error("获取Gas费时出错:", error);
      }
    };

    fetchGasPrice();
    const gasPriceInterval = setInterval(fetchGasPrice, 15000);

    if (address) {
      tokenContract = new ethers.Contract(CASP, CASP_ABI, provider);

      const handleTransfer = async (
        from: string,
        to: string,
        amount: ethers.BigNumber,
        event: any
      ) => {
        if (from === address || to === address) {
          try {
            const transactionHash = event.transactionHash;
            const isExistingTransaction = transactions.some(
              (transaction) => transaction.hash === transactionHash
            );
            if (!isExistingTransaction) {
              const transactionDetails = {
                hash: transactionHash,
                blockNumber: event.blockNumber,
                from: from,
                to: to,
                timestamp: Date.now(),
                amount: amount.toNumber(),
              };
              setTransactions((prevTransactions) => [
                ...prevTransactions,
                transactionDetails,
              ]);
              const walletBalance = await tokenContract.balanceOf(address);
              setBalance(walletBalance.toNumber());
            }
          } catch (error) {
            console.error("获取交易区块信息时出错:", error);
          }
        }
      };

      tokenContract.on("Transfer", handleTransfer);

      return () => {
        if (tokenContract) {
          tokenContract.removeListener("Transfer", handleTransfer);
        }
        clearInterval(gasPriceInterval);
      };
    }

    return () => {
      clearInterval(gasPriceInterval);
    };
  }, [mnemonic, address]);

  return (
    <WalletContext.Provider
      value={{
        mnemonic,
        setMnemonic,
        privateKey,
        setPrivateKey,
        address,
        balance,
        importWallet,
        transactions,
        gasPrice,
        sendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
