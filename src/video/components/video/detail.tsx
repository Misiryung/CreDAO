import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { fetchVideoInfo, fetchChannelInfo } from "../../api";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";

const VideoDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelAvatar, setChannelAvatar] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [subscriberCount, setSubscriberCount] = useState<number | undefined>(0);
  const { id } = useParams<{ id: string }>() ?? { id: "" };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const videoDetailData = await fetchVideoInfo(id);
        setVideoDetail(videoDetailData);

        if (videoDetailData?.snippet?.channelId) {
          const channelInfo = await fetchChannelInfo(
            videoDetailData.snippet.channelId
          );
          if (channelInfo) {
            setChannelAvatar(channelInfo.thumbnails.default.url);
            setChannelTitle(channelInfo.title);
            setSubscriberCount(channelInfo.subscriberCount);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const { snippet } = videoDetail || {
    snippet: { title: "", channelId: "", channelTitle: "" },
  };
  const { title, channelId } = snippet;

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
          width: "80px",
          height: "100%",
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
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
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: "54vw",
                height: "54vh",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
              />
            </Box>
            <Box
              sx={{
                width: "54vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                color="#000"
                fontSize="22px"
                fontWeight="bold"
                marginTop="10px"
              >
                {title || "Loading..."}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={channelAvatar}
                  alt={channelTitle}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "5px",
                  }}
                >
                  <Link to={`/channel/${channelId}`}>
                    <Typography
                      fontSize="16px"
                      fontWeight="bold"
                      color="#000"
                      sx={{ marginLeft: "10px" }}
                    >
                      {channelTitle}
                    </Typography>
                  </Link>
                  <Typography
                    fontSize="14px"
                    color="#7F7F7F"
                    sx={{ marginLeft: "10px" }}
                  >
                    • {subscriberCount} 订阅者
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              flex: 1,
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
