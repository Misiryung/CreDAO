import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Sidebar from "../sidebar/sidebar";
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

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (playedSeconds < 10) {
      const remaining = Math.ceil(10 - playedSeconds);
      setPopupContent(`再观看 ${remaining} 秒，即可获得奖励`);
    } else if (playedSeconds >= 10) {
      setPopupContent("您已获得奖励");
    }
  };

  const { snippet = { title: "", channelId: "", channelTitle: "" } } = videoDetail || {};
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
            marginRight: "10px",
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
      {showPopup && (
        <Box
          sx={{
            position: "fixed",
            height: "2vh",
            top: "2vh",
            right: "15vw",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {popupContent}
        </Box>
      )}
    </Box>
  );
};

export default VideoDetail;
