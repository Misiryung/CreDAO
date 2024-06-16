import React, { useState } from "react";
import {
  Box,
  styled,
  TextField,
  Typography,
  InputAdornment,
  Paper,
} from "@mui/material";
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

interface Page3Props {
  onBack: () => void;
}

const Page3: React.FC<Page3Props> = ({ onBack }) => {
  const [mnemonicInputs, setMnemonicInputs] = useState<string[]>(
    new Array(12).fill("")
  );
  const [error, setError] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState<boolean[]>(
    new Array(12).fill(false)
  );
  const { setMnemonic, importWallet } = useWallet() as {
    setMnemonic: (mnemonic: string | null) => void;
    importWallet: () => Promise<void>;
  };

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

      const provider = new ethers.providers.JsonRpcProvider(
        RPC_URL,
        ZHIEN_Network
      );
      await provider.getBlockNumber();
      const wallet = await ethers.Wallet.fromMnemonic(mnemonic);

      setMnemonic(mnemonic);
      await importWallet();

      setError(null);

      return true;
    } catch (err: any) {
      setError("导入钱包时出错：" + (err.message as string));
      return false;
    }
  };

  const handleMnemonicChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newMnemonicInputs = [...mnemonicInputs];
    newMnemonicInputs[index] = event.target.value;
    setMnemonicInputs(newMnemonicInputs);

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
      <Typography
        variant="h1"
        style={{
          fontWeight: "bold",
          fontSize: "32px",
          color: "#000",
          textAlign: "left",
          marginRight: "auto",
        }}
      >
        导入助记词
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          gap: "5px",
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontSize: "18px",
            color: "#000",
            textAlign: "left",
            marginRight: "auto",
          }}
        >
          请在私密环境中完成此步骤
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: "16px",
            color: "#FF0000",
            textAlign: "left",
            marginRight: "auto",
          }}
        >
          私钥、助记词一旦泄露，资产即可被他人掌控
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
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
          <CompleteButtons onClick={onBack} importWallet={handleImport} />
        </Box>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Box>
    </Box>
  );
};

export default Page3;
