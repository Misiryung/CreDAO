import * as React from "react";
import { Box, Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";

const CompleteButton = styled(Button)({
  fontSize: 16,
  padding: "6px 12px",
  backgroundColor: "#000",
  borderRadius: 10, // 添加圆角属性
  "&:hover": {
    backgroundColor: "#000",
  },
  "&:active": {
    backgroundColor: "#000",
  },
});

export default function CompleteButtons() {
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
      <CompleteButton variant="contained" fullWidth disableRipple>
        完成
      </CompleteButton>
    </Box>
  );
}
