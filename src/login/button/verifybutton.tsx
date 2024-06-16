import * as React from "react";
import { Box, Typography, styled, Button } from "@mui/material";

const VerifyButton = styled(Button)({
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

export default function VerifyButtons() {
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
      >
        返回
      </Typography>
      <VerifyButton variant="contained" fullWidth disableRipple>
        验证
      </VerifyButton>
    </Box>
  );
}
