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

  const width1 = "12vw";
  const width2 = "60vw";
  const height1 = "12vh";
  const height2 = "60vh";

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        marginLeft: "20px",
        marginRight: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "row",
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
          sx={{
            width: width1,
            height: height1,
            borderRadius: "10px",
          }}
        />
      </Link>

      <Box
        sx={{
          width: `calc(100% - ${100}px)`,
          height: height1,
          marginLeft: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            lineHeight: "16px",
            fontSize: "16px",
            color: "#000",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          <Link to={id?.videoId ? `/video/${id.videoId}` : "/"}>
            {snippet?.title}
          </Link>
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fill: "#7F7F7F",
            marginTop: "5px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {snippet?.channelTitle}
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            fill: "#7F7F7F",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {viewCount !== undefined ? viewCount : "0"}次观看 • {publishedAt}
        </Typography>
      </Box>

      <Box sx={{ marginLeft: "5px" }}>
        <DetailIcon fill="#000" width={15} height={15} />
      </Box>
    </Box>
  );
};

export default VideoCard;
