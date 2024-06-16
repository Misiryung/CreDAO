// NextstepButtons.tsx
import React from "react";
import { Box, styled, Button } from "@mui/material";

const CancelButton = styled(Button)({
  fontSize: 16,
  height: 50,
  width: "48%",
  padding: "6px 12px",
  backgroundColor: "#E0EFFE",
  color: "#2196F3",
  borderRadius: 25,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#E0EFFE",
    boxShadow: "none",
  },
});

const NextstepButton = styled(Button)({
  fontSize: 16,
  height: 50,
  width: "48%",
  padding: "6px 12px",
  backgroundColor: "#2196F3",
  color: "#FFFFFF",
  borderRadius: 25,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#2196F3",
    boxShadow: "none",
  },
});

interface NextstepButtonsProps {
  onReturn: () => void;
  onNext: () => void;
  disableNext: boolean;
}

const NextstepButtons: React.FC<NextstepButtonsProps> = ({
  onReturn,
  onNext,
  disableNext,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <CancelButton variant="contained" disableRipple onClick={onReturn}>
        取消
      </CancelButton>
      <NextstepButton variant="contained" disableRipple onClick={onNext} disabled={disableNext}>
        下一步
      </NextstepButton>
    </Box>
  );
};

export default NextstepButtons;
