import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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

    if (selectedCategory === "首页") {
      navigate("/首页");
      return;
    }

    searchVideos(selectedCategory)
      .then((data) => setVideos(data))
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setVideos([]);
      });
  }, [selectedCategory, navigate]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: `calc(100% - ${8}vh)`,
        }}
      >
        <Box
          sx={{
            width: "6vw",
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />
        </Box>
        <Box
          sx={{
            width: `calc(100% - ${20}px - ${6}vw)`,
            marginRight: "20px",
            overflowY: "auto",
          }}
        >
          <VideoList videoList={videos || []} maxCards={20} />
        </Box>
      </Box>
    </Box>
  );
};

export default Feed;
