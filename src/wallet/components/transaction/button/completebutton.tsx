import * as React from "react";
import { Box, styled, Button } from "@mui/material";

const LaststepButton = styled(Button)({
  fontSize: 16,
  height: 50,
  width: "48%",
  padding: "6px 12px",
  backgroundColor: "#E0EFFE",
  color: "#2196F3",
  borderRadius: 25,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#E0EFFE",
    boxShadow: "none",
  },
});

const CompleteButton = styled(Button)({
  fontSize: 16,
  height: 50,
  width: "48%",
  padding: "6px 12px",
  backgroundColor: "#2196F3",
  color: "#FFFFFF",
  borderRadius: 25,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#2196F3",
    boxShadow: "none",
  },
});

interface CompleteButtonsProps {
  onReturn: () => void;
  onComplete: () => void;
  sendTransaction: () => void;
}

const CompleteButtons: React.FC<CompleteButtonsProps> = ({
  onReturn,
  onComplete,
  sendTransaction,
}) => {

  const handleComplete = () => {
    sendTransaction();
    onComplete();
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <LaststepButton variant="contained" disableRipple onClick={onReturn}>
        上一步
      </LaststepButton>
      <CompleteButton variant="contained" disableRipple onClick={handleComplete}>
        提交
      </CompleteButton>
    </Box>
  );
};

export default CompleteButtons;
