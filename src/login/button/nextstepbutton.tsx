import * as React from "react";
import { Box, Typography, styled, Button } from "@mui/material";

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

interface NextstepButtonsProps {
  onClick1: () => void;
  onClick2: () => void;
}

const NextstepButtons: React.FC<NextstepButtonsProps> = ({
  onClick1,
  onClick2,
}) => {
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
        onClick={onClick1}
      >
        返回
      </Typography>
      <NextstepButton
        variant="contained"
        fullWidth
        disableRipple
        onClick={onClick2}
      >
        下一步
      </NextstepButton>
    </Box>
  );
};

export default NextstepButtons;
