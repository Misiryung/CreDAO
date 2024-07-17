import React from "react";
import { Stack, Box } from "@mui/material";
import VideoCard from "./card1";
import { VideoTypes } from "./types";

const VideoList: React.FC<VideoListProps> = ({
  videoList,
  direction,
  maxCards,
}) => {
  const slicedVideoList = maxCards ? videoList.slice(0, maxCards) : videoList;

  return (
    <Stack direction={direction || "column"} flexWrap="wrap">
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
