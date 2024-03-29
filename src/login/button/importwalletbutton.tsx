import * as React from "react";
import { Paper, Typography, styled, Button } from "@mui/material";

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

interface ImportWalletButtonsProps {
  onButtonClick2: () => void;
}

const ImportWalletButtons: React.FC<ImportWalletButtonsProps> = ({
  onButtonClick2,
}) => {
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
      <ImportWalletButton
        variant="contained"
        fullWidth
        disableRipple
        onClick={onButtonClick2}
      >
        导入钱包
      </ImportWalletButton>
    </Paper>
  );
};

export default ImportWalletButtons;
