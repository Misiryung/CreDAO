import * as React from "react";
import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

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
  },
  "&:active": {
    border: "1.6px solid #000",
  },
  "&:focus": {
    border: "1.6px solid #000",
  },
});

interface LoginButtonsProps {
  onRegisterClick: () => void; // Define the prop for onRegisterClick function
}

const LoginButtons: React.FC<LoginButtonsProps> = ({ onRegisterClick }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <LoginButton variant="contained" fullWidth disableRipple>
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
        onClick={onRegisterClick}
      >
        注册
      </RegisterButton>
    </Box>
  );
};

export default LoginButtons;
