import * as React from "react";
import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

const NextstepButton = styled(Button)({
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

export default function NextstepButtons() {
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
      <NextstepButton variant="contained" fullWidth disableRipple>
        登录
      </NextstepButton>
    </Box>
  );
}
