import React, { useState } from "react";
import { Box, styled, TextField, InputAdornment } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";

const PasswordTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#000",
      borderWidth: "1.2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: "1.6px",
    },
  },
});

export default function PasswordTextFields() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <PasswordTextField
      id="outlined-adornment-password"
      type={showPassword ? "text" : "password"}
      label="请输入密码"
      fullWidth
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Box
              component="button"
              aria-label="toggle password visibility"
              alignItems="center"
              onClick={handleClickShowPassword}
              sx={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {showPassword ? (
                <VisibilityIcon width={20} height={20} fill="#000" />
              ) : (
                <VisibilityOffIcon width={20} height={20} fill="#000" />
              )}
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
}
