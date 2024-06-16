import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { searchVideos } from "../../api";
import VideoList from "../video/list";
import { VideoTypes } from "../video/types";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";

const Feed: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [videos, setVideos] = useState<VideoTypes[] | null>(null);
  const { searchTerm: paramSearchTerm } = useParams<{ searchTerm?: string }>();

  useEffect(() => {
    if (paramSearchTerm === undefined) {
      setSearchTerm("");
    } else {
      setSearchTerm(paramSearchTerm || "");
      setSelectedCategory("");
    }
  }, [paramSearchTerm]);

  useEffect(() => {
    if (!searchTerm) return;

    searchVideos(searchTerm)
      .then((data) => setVideos(data))
      .catch((error) => {
        console.error("Error searching videos:", error);
        setVideos([]);
      });
  }, [searchTerm]);

  useEffect(() => {
    if (!selectedCategory) return;

    searchVideos(selectedCategory)
      .then((data) => setVideos(data))
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setVideos([]);
      });
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          width: "200px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY: "hidden",
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#7F7F7F" }}
        >
          © CreDAO Users Version
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Navbar />
        <Box
          sx={{
            overflowY: "auto",
            height: "100%",
            p: 2,
          }}
        >
          <VideoList videoList={videos || []} maxCards={20} />
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
