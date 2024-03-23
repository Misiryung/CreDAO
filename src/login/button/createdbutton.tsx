import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, styled, Button } from "@mui/material";

const CreatedButton = styled(Button)({
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

interface CreatedButtonsProps {
  onBack4: () => void;
}

const CreatedButtons: React.FC<CreatedButtonsProps> = ({ onBack4 }) => {
  const navigate = useNavigate();
  const handleCreated = () => {
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
        onClick={onBack4}
      >
        返回
      </Typography>
      <CreatedButton
        variant="contained"
        fullWidth
        disableRipple
        onClick={handleCreated}
      >
        完成创建
      </CreatedButton>
    </Box>
  );
};

export default CreatedButtons;
