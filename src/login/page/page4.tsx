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

interface Page4Props {
  onBack: () => void;
}

const Page4: React.FC<Page4Props> = ({ onBack }) => {
  const [privateKeyInput, setPrivateKeyInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setPrivateKey, importWallet } = useWallet() as {
    setPrivateKey: (privateKey: string | null) => void;
    importWallet: () => Promise<void>;
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleImport = async (): Promise<boolean> => {
    try {
      const privateKey = privateKeyInput.trim();

      if (!privateKey) {
        setError("请输入私钥");
        return false;
      }

      const provider = new ethers.providers.JsonRpcProvider(RPC_URL, ZHIEN_Network);
      await provider.getBlockNumber();
      const wallet = new ethers.Wallet(privateKey, provider);

      setPrivateKey(privateKey);
      await importWallet();

      setError(null);
      return true;
    } catch (err: any) {
      setError("导入钱包时出错：" + (err.message as string));
      return false;
    }
  };

  const handlePrivateKeyChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPrivateKeyInput(event.target.value);
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
        导入私钥
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
          私钥一旦泄露,资产即可被他人掌控
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
        <PrivatekeyTextField
          id="private-key"
          type={showPassword ? "text" : "password"}
          fullWidth
          size="small"
          value={privateKeyInput}
          onChange={handlePrivateKeyChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  component="button"
                  aria-label="toggle password visibility"
                  alignItems="center"
                  onClick={handleClickShowPassword}
                  sx={{
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {showPassword ? (
                    <VisibilityIcon width={20} height={20} fill="#000" />
                  ) : (
                    <VisibilityOffIcon width={20} height={20} fill="#000" />
                  )}
                </Box>
              </InputAdornment>
            ),
          }}
        />
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

export default Page4;
