import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Navbar from "../navbar/navbar";
import VideoList from "../video/list1";
import { VideoTypes } from "../video/types";
import { fetchVideoInfo, fetchChannelInfo, searchVideos } from "../../api";

const VideoDetail: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("New");
  const [videos, setVideos] = useState<VideoTypes[] | null>(null);
  const [videoDetail, setVideoDetail] = useState<any>(null);
  const [channelAvatar, setChannelAvatar] = useState<string>("");
  const [channelTitle, setChannelTitle] = useState<string>("");
  const [subscriberCount, setSubscriberCount] = useState<number | undefined>(0);
  const [popupContent, setPopupContent] = useState<string>("播放中...");
  const [showPopup, setShowPopup] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>() ?? { id: "" };

  const width1 = "64vw";
  const height1 = "8vh";
  const height2 = "64vh";

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

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (playedSeconds < 10) {
      const remaining = Math.ceil(10 - playedSeconds);
      setPopupContent(`再观看 ${remaining} 秒，即可获得奖励`);
    } else if (playedSeconds >= 10) {
      setPopupContent("您已获得奖励");
    }
  };

  const { snippet = { title: "", channelId: "", channelTitle: "" } } =
    videoDetail || {};
  const { title, channelId } = snippet;

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
          width: `calc(100% - ${30}px)`,
          height: `calc(100vh - ${height1} - ${10}px)`,
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          paddingLeft: "20px",
          paddingRight: "10px",
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
              width: width1,
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
                position: "relative",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
                onProgress={handleProgress}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
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
              width: `calc(100% - ${width1})`,
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
      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            height: "4vh",
            top: "2vh",
            left: "69vw",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "14px",
            paddingLeft: "1vw",
            paddingRight: "1vw",
          }}
        >
          {popupContent}
        </Box>
      )}
    </Box>
  );
};

export default VideoDetail;
