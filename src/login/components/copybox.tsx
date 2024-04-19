import React from "react";
import { Box, Typography } from "@mui/material";
import { CopyIcon } from "../.././wallet/components/home/icons";

const CopyBox: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CopyIcon width={22} height={22} fill="#000" />
      <Typography
        variant="body1"
        style={{
          fontSize: "16px",
          color: "#000",
          marginLeft: "5px",
        }}
      >
        复制
      </Typography>
    </Box>
  );
};

export default CopyBox;
