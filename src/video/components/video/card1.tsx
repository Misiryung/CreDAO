import React, { useState, useEffect } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DetailIcon from "./icons";
import { VideoTypes } from "./types";
import { fetchChannelInfo, fetchVideoInfo } from "../../api";

const VideoCard: React.FC<{ video: VideoTypes }> = ({ video }) => {
  const { id, snippet } = video;
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [channelAvatar, setChannelAvatar] = useState<string>("");
  const [viewCount, setViewCount] = useState<number | undefined>(0);
  const [publishedAt, setPublishedAt] = useState<string>("");

  useEffect(() => {
    const fetchChannel = async () => {
      if (snippet?.channelId) {
        const channelInfo = await fetchChannelInfo(snippet.channelId);
        if (channelInfo) {
          setChannelTitle(channelInfo.title);
          setChannelAvatar(channelInfo.thumbnails.default.url);
        }
      }
    };

    fetchChannel();
  }, [snippet?.channelId]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      if (id.videoId) {
        const videoInfo = await fetchVideoInfo(id.videoId);
        if (videoInfo) {
          const { publishedAt, statistics } = videoInfo.snippet;
          setPublishedAt(publishedAt);
          setViewCount(statistics?.viewCount);
        }
      }
    };

    fetchVideoDetails();
  }, [video]);

  return (
    <Box
      sx={{
        marginRight: 3,
        marginBottom: 5,
        display: "flex",
        flexDirection: "row",
        borderRadius: "20px",
      }}
    >
      <Link
        to={id?.videoId ? `/video/${id.videoId}` : "/video/cV2gBU6hKfY"}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          image={snippet?.thumbnails?.high?.url}
          alt={snippet?.title}
          sx={{ width: "160px", height: "90px", borderRadius: "10px" }}
        />
      </Link>

      <Box
        sx={{
          height: "90px",
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "calc(100% - 60px)",
        }}
      >
        <Typography
          sx={{
            lineHeight: "18px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            variant: "subtitle1",
            fontSize: "16px",
            color: "#000",
          }}
        >
          <Link to={id?.videoId ? `/video/${id.videoId}` : "/"}>
            {snippet?.title}
          </Link>
        </Typography>

        <Typography
          sx={{ fontSize: "14px", fill: "#7F7F7F", marginTop: "5px" }}
        >
          {snippet?.channelTitle}
        </Typography>

        <Typography sx={{ fontSize: "14px", fill: "#7F7F7F" }}>
          {viewCount !== undefined ? viewCount : "Loading..."}次观看 •{" "}
          {publishedAt}
        </Typography>
      </Box>

      <Box sx={{ marginLeft: "5px" }}>
        <DetailIcon fill="#000" width={15} height={15} />
      </Box>
    </Box>
  );
};

export default VideoCard;
