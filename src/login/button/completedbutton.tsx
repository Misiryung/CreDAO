import * as React from "react";
import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

const CompletedButton = styled(Button)({
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

export default function CompletedButtons() {
  return (
    <CompletedButton variant="contained" fullWidth disableRipple>
      完成
    </CompletedButton>
  );
}
