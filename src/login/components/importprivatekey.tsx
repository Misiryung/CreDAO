import React, { useState } from "react";
import { Box, styled, TextField, InputAdornment, Paper } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";
import CompleteButtons from "../button/completebutton";
import { ethers } from "ethers";

const YOUR_NODE_URL = "http://192.168.1.6:8551"; // 替换成你自己的节点地址
const ZHIEN_NETWORK = {
  name: 'ZHIEN', 
  chainId: 142623,
};
const TOKEN_CONTRACT_ADDRESS = "0xAf54cfF2B187E76dC6c36D2f23a5F74D39914C08"; // 替换成你部署的代币合约地址

const PrivatekeyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#000",
      borderWidth: "1.2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: "1.6px",
    },
  },
});

const PrivatekeyPaper = styled(Paper)({
  padding: "2%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "1.2px solid black",
  borderRadius: "10px",
  boxShadow: "none",
  "> *:not(:last-child)": {
    marginBottom: "2%",
  },
});

const ImportPrivatekey: React.FC<{ onBack2: () => void }> = ({ onBack2 }) => {
  const [mnemonicInputs, setMnemonicInputs] = useState<string[]>(new Array(12).fill(""));
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<boolean[]>(new Array(12).fill(false));

  const handleClickShowPassword = (index: number) => {
    setShowPasswords((prevState) => {
      const newShowPasswords = [...prevState];
      newShowPasswords[index] = !newShowPasswords[index];
      return newShowPasswords;
    });
  };

  const handleImport = async (): Promise<boolean> => {
    try {
      const mnemonic = mnemonicInputs.join(" ");
      
      if (!mnemonic) {
        setError("请输入助记词");
        return false; // Return false if mnemonic is empty
      }

      const provider = new ethers.providers.JsonRpcProvider(YOUR_NODE_URL, ZHIEN_NETWORK);
      const importedWallet = await ethers.Wallet.fromMnemonic(mnemonic);
      const connectedWallet = importedWallet.connect(provider);
      setWallet(connectedWallet);

      // 获取代币余额
      const contract = new ethers.Contract(
        TOKEN_CONTRACT_ADDRESS,
        ["function balanceOf(address) view returns (uint)"],
        connectedWallet
      );
      const tokenBalance = await contract.balanceOf(connectedWallet.address);
      setBalance(tokenBalance.toString());

      setError(null);
      return true; // Return true for successful wallet import
    } catch (err: any) {
      setError("导入钱包时出错：" + (err.message as string));
      return false; // Return false for failed wallet import
    }
  };

  const handleMnemonicChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newMnemonicInputs = [...mnemonicInputs];
    newMnemonicInputs[index] = event.target.value;
    setMnemonicInputs(newMnemonicInputs);
};

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PrivatekeyPaper>
        {[0, 1, 2, 3].map((row) => (
          <Box
            key={row}
            display="flex"
            justifyContent="space-between"
            mb={row !== 3 ? 2 : 0}
            alignItems="center"
          >
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Box key={index} width="32%">
                  <PrivatekeyTextField
                    id={`password-${index}`}
                    type={showPasswords[index] ? "text" : "password"}
                    fullWidth
                    size="small"
                    value={mnemonicInputs[index]}
                    onChange={(event) => handleMnemonicChange(event, index)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            component="button"
                            aria-label="toggle password visibility"
                            alignItems="center"
                            onClick={() => handleClickShowPassword(index)}
                            sx={{
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            {showPasswords[index] ? (
                              <VisibilityIcon
                                width={20}
                                height={20}
                                fill="#000"
                              />
                            ) : (
                              <VisibilityOffIcon
                                width={20}
                                height={20}
                                fill="#000"
                              />
                            )}
                          </Box>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        ))}
      </PrivatekeyPaper>
      <Box
        sx={{
          width: "100%",
          marginTop: "80px",
        }}
      >
        <CompleteButtons onBack2={onBack2} importWallet={handleImport} />
      </Box>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {wallet && (
        <div>
          <p>钱包地址：{wallet.address}</p>
          <p>代币余额：{balance}</p>
        </div>
      )}
    </Box>
  );
};

export default ImportPrivatekey;
