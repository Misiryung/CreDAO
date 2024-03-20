import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import VideoDetail from "./video/components/video/detail";
import Feed from "./video/components/feed/feed";
import LoginHome from "./login/loginhome";

const App: React.FC = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#FFF" }}>
      <Routes>
        <Route path="/" element={<LoginHome />} />
        <Route path="/首页" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/search/:searchTerm" element={<Feed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
