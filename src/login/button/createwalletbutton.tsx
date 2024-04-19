import * as React from "react";
import { Paper, Typography, styled, Button } from "@mui/material";

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

interface CreateWalletButtonsProps {
  onButtonClick3: () => void;
}

const CreateWalletButtons: React.FC<CreateWalletButtonsProps> = ({
  onButtonClick3,
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
        我是新手，马上开始创建
      </Typography>
      <CreateWalletButton
        variant="contained"
        fullWidth
        disableRipple
        onClick={onButtonClick3}
      >
        创建钱包
      </CreateWalletButton>
    </Paper>
  );
};

export default CreateWalletButtons;
