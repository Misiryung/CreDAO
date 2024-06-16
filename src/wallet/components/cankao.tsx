/*
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useWallet } from "../../zhien/walletcontext";
import { ethers } from "ethers";
import { RPC_URL, ZHIEN_Network } from "../../zhien/config";
const TransactionForm = () => {
  const { address } = useWallet();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | undefined>("");

  const handleRecipientChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipient(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // 检查接收者地址是否有效
      if (!ethers.utils.isAddress(recipient)) {
        setError("接收者地址无效");
        return;
      }

      // 检查金额是否有效
      if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        setError("请输入有效的金额");
        return;
      }

      // 发起交易
      const provider = new ethers.providers.JsonRpcProvider(
        RPC_URL,
        ZHIEN_Network
      );
      const wallet = provider.getSigner();
      const transaction = await wallet.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount), // 转换为以太币单位
      });
      console.log("交易已发送:", transaction);

      // 清空表单并重置错误状态
      setRecipient("");
      setAmount("");
      setError("");
    } catch {
      console.error("发起交易时出错");
      setError("发起交易时出错，请稍后重试");
    }
  };

  return (
    <div>
      <h2>发起交易</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>接收者地址:</label>
          <input
            type="text"
            value={recipient}
            onChange={handleRecipientChange}
          />
        </div>
        <div>
          <label>金额 (以太币):</label>
          <input type="text" value={amount} onChange={handleAmountChange} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">发送交易</button>
      </form>
    </div>
  );
};

export default TransactionForm;
*/
