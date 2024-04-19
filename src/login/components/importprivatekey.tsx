import React, { useState } from "react";
import { Box, styled, TextField, InputAdornment, Paper } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";
import CompleteButtons from "../button/completebutton";
import { RPC_URL, ZHIEN_Network } from "../../wallet/zhien/config";
import { useWallet } from "../../wallet/zhien/walletcontext";
import { ethers } from "ethers";

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
  const [error, setError] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<boolean[]>(new Array(12).fill(false));
  const { setMnemonic } = useWallet() as { setMnemonic: (mnemonic: string | null) => void };

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
        return false;
      }
  
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ZHIEN_Network);
      await provider.getBlockNumber(); 
      const wallet = await ethers.Wallet.fromMnemonic(mnemonic);

      setMnemonic(mnemonic);

      setError(null);

      return true;
    } catch (err: any) {
      setError("导入钱包时出错：" + (err.message as string));
      return false; // Return false for failed wallet import
    }
  };

  const handleMnemonicChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const newMnemonicInputs = [...mnemonicInputs];
    newMnemonicInputs[index] = event.target.value;
    setMnemonicInputs(newMnemonicInputs);

    // 将助记词传递给钱包上下文
    const mnemonicString = newMnemonicInputs.join(" ");
    setMnemonic(mnemonicString);
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
    </Box>
  );
};

export default ImportPrivatekey;
