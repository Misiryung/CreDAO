import React from "react";
import { Box, Typography, Paper, styled, Button } from "@mui/material";

const ImportWalletButton = styled(Button)({
  fontSize: 16,
  padding: "6px 12px",
  backgroundColor: "#000",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: "#000",
  },
  "&:active": {
    backgroundColor: "#000",
  },
});

const CreateWalletButton = styled(Button)({
  fontSize: 16,
  padding: "6px 12px",
  backgroundColor: "#000",
  borderRadius: 10,
  "&:hover": {
    backgroundColor: "#000",
  },
  "&:active": {
    backgroundColor: "#000",
  },
});

interface Page2Props {
  ImportMnemonics: () => void;
  importPrivateKey: () => void;
  CreateWallet: () => void;
  onBack: () => void;
}

const Page2: React.FC<Page2Props> = ({
  ImportMnemonics,
  importPrivateKey,
  CreateWallet,
  onBack,
}) => {
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
        钱包
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: "50px",
          fontSize: "18px",
          color: "#000",
          textAlign: "left",
          marginRight: "auto",
        }}
      >
        第一次使用区块链钱包？
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Paper
          elevation={0}
          style={{
            padding: "15px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "transparent",
            border: "1.2px solid black",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="body1"
            style={{
              fontSize: "16px",
              color: "#7F7F7F",
              textAlign: "center",
            }}
          >
            不是，我已经有助记词/私钥了
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ImportWalletButton
              variant="contained"
              fullWidth
              disableRipple
              onClick={ImportMnemonics}
            >
              导入助记词
            </ImportWalletButton>
            <ImportWalletButton
              variant="contained"
              fullWidth
              disableRipple
              onClick={importPrivateKey}
            >
              导入私钥
            </ImportWalletButton>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          style={{
            padding: "15px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "transparent",
            border: "1.2px solid black",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="body1"
            style={{
              fontSize: "16px",
              color: "#7F7F7F",
              textAlign: "center",
            }}
          >
            我是新手，马上开始创建
          </Typography>
          <CreateWalletButton
            variant="contained"
            fullWidth
            disableRipple
            onClick={CreateWallet}
          >
            创建钱包
          </CreateWalletButton>
        </Paper>

        <Typography
          variant="body1"
          style={{
            fontSize: "16px",
            color: "#000",
            cursor: "pointer",
          }}
          onClick={onBack}
        >
          返回
        </Typography>
      </Box>
    </Box>
  );
};

export default Page2;
