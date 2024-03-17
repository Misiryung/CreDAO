import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import ImportWalletButtons from "../components/importwallet";

const Page2: React.FC = () => {
  return (
    <Paper
      sx={{
        width: "25vw",
        height: "100vh",
        bgcolor: "#FFF",
        boxShadow: "none",
        borderRadius: 0,
        border: "none",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "16%",
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
          }}
        >
          <ImportWalletButtons />
        </Box>
      </Box>
    </Paper>
  );
};

export default Page2;
