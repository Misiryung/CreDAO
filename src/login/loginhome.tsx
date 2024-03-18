import React from "react";
import { Box, CssBaseline, Paper } from "@mui/material";
import Page1 from "./page/page1";

const LoginHome: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          margin: 0,
          padding: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
        }}
      >
        <video
          src={`${process.env.PUBLIC_URL}/background2.mp4`}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Paper
          sx={{
            width: "28vw",
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
              position: "absolute",
              top: "16%",
            }}
          >
            <Page1 />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LoginHome;
