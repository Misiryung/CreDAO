import React from "react";
import { Box, CssBaseline, Paper } from "@mui/material";
import { useState } from "react";
import Page1 from "./page/page1"; // Import other page components
import Page2 from "./page/page2";
import Page3 from "./page/page3";
import Page4 from "./page/page4";
import Page5 from "./page/page5";

const LoginHome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("page1");

  const renderPage = () => {
    switch (currentPage) {
      case "page1":
        return <Page1 onButtonClick1={() => setCurrentPage("page2")} />;
      case "page2":
        return (
          <Page2
            onBack1={() => setCurrentPage("page1")}
            onButtonClick2={() => setCurrentPage("page3")}
            onButtonClick3={() => setCurrentPage("page4")}
          />
        );
      case "page3":
        return <Page3 onBack2={() => setCurrentPage("page2")} />;
      case "page4":
        return (
          <Page4
            onBack3={() => setCurrentPage("page2")}
            onButtonClick4={() => setCurrentPage("page5")}
          />
        );
      case "page5":
        return <Page5 onBack4={() => setCurrentPage("page4")}/>;
      default:
        return null;
    }
  };

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
              position: "absolute",
              top: "16%",
            }}
          >
            {renderPage()}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LoginHome;
