import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, styled, Button } from "@mui/material";

const CompleteButton = styled(Button)({
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

interface CompleteButtonsProps {
  onBack2: () => void;
}

const CompleteButtons: React.FC<CompleteButtonsProps> = ({ onBack2 }) => {
  const navigate = useNavigate();
  const handleComplete = () => {
    navigate("/首页");
  };
  return (
    <Box display="flex" flexDirection="row" alignItems="center" width="100%">
      <Typography
        variant="body1"
        style={{
          width: "40%",
          fontSize: "16px",
          color: "#000",
          textAlign: "left",
        }}
        onClick={onBack2}
      >
        返回
      </Typography>
      <CompleteButton
        variant="contained"
        fullWidth
        disableRipple
        onClick={handleComplete}
      >
        完成
      </CompleteButton>
    </Box>
  );
};

export default CompleteButtons;
