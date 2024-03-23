import React from "react";
import { styled, TextField } from "@mui/material";

const AccountTextField = styled(TextField)({
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

export default function AccountTextFields() {
  return (
    <AccountTextField
      label="请输入手机号"
      fullWidth
      id="outlined-size-small"
      margin="dense"
      size="small"
    />
  );
}
