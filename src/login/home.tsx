import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Page2 from "./page/page2";

const LoginPage: React.FC = () => {
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
          position: "relative", // Ensure positioning context for the background image
        }}
      >
        {/* Background image */}
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
        <Page2 />
      </Box>
    </>
  );
};

export default LoginPage;
