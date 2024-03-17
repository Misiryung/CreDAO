import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import MnemonicImport from "../components/privatekey";
import CompleteButtons from "../components/completebutton";

const Page3: React.FC = () => {
  return (
    <Paper
      sx={{
        width: "30vw",
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
          导入助记词
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
            gap: "5px",
          }}
        >
          <Typography
            variant="body1"
            style={{
              fontSize: "18px",
              color: "#000",
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            请在私密环境中完成此步骤
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontSize: "16px",
              color: "#FF0000",
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            私钥、助记词一旦泄露，资产即可被他人掌控
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "50px",
          }}
        >
          <MnemonicImport />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "80px",
          }}
        >
          <CompleteButtons />
        </Box>
      </Box>
    </Paper>
  );
};

export default Page3;
