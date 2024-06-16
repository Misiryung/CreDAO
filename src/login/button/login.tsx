import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, styled, Button } from "@mui/material";

const LoginButton = styled(Button)({
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

const RegisterButton = styled(Button)({
  fontSize: 16,
  padding: "6px 12px",
  border: "1.6px solid #000",
  borderRadius: 10,
  color: "#000",
  "&:hover": {
    border: "1.6px solid #000",
    backgroundColor: "transparent",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
  "&:active": {
    border: "1.6px solid #000",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  "&:focus": {
    border: "1.6px solid #000",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  },
});

interface LoginButtonsProps {
  onClick: () => void;
}

const LoginButtons: React.FC<LoginButtonsProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/首页");
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <LoginButton
        variant="contained"
        fullWidth
        disableRipple
        onClick={handleLogin}
      >
        登录
      </LoginButton>

      <Typography
        variant="body1"
        style={{
          fontSize: "16px",
          color: "#000",
        }}
      >
        or
      </Typography>

      <RegisterButton
        variant="outlined"
        fullWidth
        disableRipple
        onClick={onClick}
      >
        注册
      </RegisterButton>
    </Box>
  );
};

export default LoginButtons;
