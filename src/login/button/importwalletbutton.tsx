import * as React from "react";
import { Box, Paper, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

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

export default function ImportWalletButtons() {
  return (
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
        border: "1.6px solid black",
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
  );
}
