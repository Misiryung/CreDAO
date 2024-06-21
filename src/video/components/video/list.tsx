import React from "react";
import { Stack, Box } from "@mui/material";
import Loader from "../feed/loader";
import VideoCard from "./card";
import { VideoTypes } from "./types";

const VideoList: React.FC<VideoListProps> = ({
  videoList,
  direction,
  maxCards,
}) => {
  if (!videoList?.length) return <Loader />;

  const slicedVideoList = maxCards ? videoList.slice(0, maxCards) : videoList;

  return (
    <Stack direction={direction || "row"} flexWrap="wrap" marginTop="10px">
      {slicedVideoList.map((video, index) => (
        <Box key={index}>{video.id.videoId && <VideoCard video={video} />}</Box>
      ))}
    </Stack>
  );
};

interface VideoListProps {
  videoList: VideoTypes[];
  direction?: "row" | "column";
  maxCards?: number;
}

export default VideoList;
