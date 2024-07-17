import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box } from "@mui/material";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/navbar";
import VideoList from "../video/list1";
import { VideoTypes } from "../video/types";
import { fetchVideoInfo, fetchChannelInfo, searchVideos } from "../../api";

const VideoDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const [videos, setVideos] = useState<VideoTypes[] | null>(null);
  const [videoDetail, setVideoDetail] = useState(null);
  const [channelAvatar, setChannelAvatar] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [subscriberCount, setSubscriberCount] = useState<number | undefined>(0);
  const { id } = useParams<{ id: string }>() ?? { id: "" };

  const width1 = "80px";
  const width2 = "60vw";
  const height1 = "8vh";
  const height2 = "60vh";

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

        const relatedVideos = await searchVideos(
          videoDetailData?.snippet?.title || ""
        );
        setVideos(relatedVideos);
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
          width: width1,
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
          width: `calc(100vw - ${width1})`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Box
          sx={{
            width: `calc(100% - ${10}px)`,
            height: `calc(100vh - ${height1} - ${10}px)`,
            marginRigth: "10px",
            marginTop: "10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                width: width2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: height2,
                  borderRadius: "16px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-start",
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
                      {subscriberCount || "0"} 订阅者
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: `calc(100% - ${width2})`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                overflowY: "auto",
              }}
            >
              <VideoList videoList={videos || []} maxCards={20} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
