import * as React from "react";
import { Box, Paper, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

const ImportWalletButton = styled(Button)({
  fontSize: 16,
  padding: "6px 12px",
  backgroundColor: "#000",
  borderRadius: 10, // 添加圆角属性
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
  borderRadius: 10, // 添加圆角属性
  "&:hover": {
    backgroundColor: "#000",
  },
  "&:active": {
    backgroundColor: "#000",
  },
});

export default function ImportWalletButtons() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="20px"
      width="100%"
    >
      <Paper
        style={{
          padding: "15px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "transparent",
          border: "1px solid black",
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
          不是，我已经有助记词/钱包了
        </Typography>
        <ImportWalletButton variant="contained" fullWidth disableRipple>
          导入钱包
        </ImportWalletButton>
      </Paper>
      <Paper
        style={{
          padding: "15px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          backgroundColor: "transparent",
          border: "1px solid black",
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
        <CreateWalletButton variant="contained" fullWidth disableRipple>
          创建钱包
        </CreateWalletButton>
      </Paper>
    </Box>
  );
}
