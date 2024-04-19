import React from "react";
import { Box, Typography } from "@mui/material";
import ImportWalletButtons from "../button/importwalletbutton";
import CreateWalletButtons from "../button/createwalletbutton";

interface Page2Props {
  onBack1: () => void;
  onButtonClick2: () => void;
  onButtonClick3: () => void;
}

const Page2: React.FC<Page2Props> = ({
  onBack1,
  onButtonClick2,
  onButtonClick3,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        style={{
          fontWeight: "bold",
          fontSize: "32px",
          color: "#000",
          textAlign: "left",
          marginRight: "auto",
        }}
      >
        钱包
      </Typography>
      <Typography
        variant="body1"
        style={{
          marginTop: "50px",
          fontSize: "18px",
          color: "#000",
          textAlign: "left",
          marginRight: "auto",
        }}
      >
        第一次使用区块链钱包？
      </Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <ImportWalletButtons onButtonClick2={onButtonClick2} />
        <CreateWalletButtons onButtonClick3={onButtonClick3} />
        <Typography
          variant="body1"
          style={{
            fontSize: "16px",
            color: "#000",
            cursor: "pointer",
          }}
          onClick={onBack1}
        >
          返回
        </Typography>
      </Box>
    </Box>
  );
};

export default Page2;
