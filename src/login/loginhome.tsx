import React from "react";
import { Box, CssBaseline, Paper } from "@mui/material";
import { useState } from "react";
import Page1 from "./page/page1";
import Page2 from "./page/page2";
import Page3 from "./page/page3";
import Page4 from "./page/page4";
import Page5 from "./page/page5";
import Page6 from "./page/page6";

const LoginHome: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("page1");

  const renderPage = () => {
    switch (currentPage) {
      case "page1":
        return <Page1 Register={() => setCurrentPage("page2")} />;
      case "page2":
        return (
          <Page2
            ImportMnemonics={() => setCurrentPage("page3")}
            importPrivateKey={() => setCurrentPage("page4")}
            CreateWallet={() => setCurrentPage("page5")}
            onBack={() => setCurrentPage("page1")}
          />
        );
      case "page3":
        return <Page3 onBack={() => setCurrentPage("page2")} />;
      case "page4":
        return <Page4 onBack={() => setCurrentPage("page2")} />;
      case "page5":
        return (
          <Page5
            onBack={() => setCurrentPage("page2")}
            onNext={() => setCurrentPage("page6")}
          />
        );
        case "page6":
        return <Page6 onBack={() => setCurrentPage("page5")} />;
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
