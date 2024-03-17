import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CopyIcon, ZHENLogo, JumpIcon } from "../icons";

const Overview: React.FC = () => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        width: 280,
        height: 44,
        boxShadow: "none",
        borderBottom: "2px solid #f2f2f2",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "12px",
        }}
      >
        <ZHENLogo width={24} height={24} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexGrow: 1,
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "15px" }}>
          0 ZHEN
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "12px",
              color: "#7F7F7F",
              marginRight: "4px",
            }}
          >
            Account Address
          </Typography>
          <CopyIcon width={14} height={14} fill="#7F7F7F" />
          <Typography
            variant="h1"
            sx={{
              fontSize: "12px",
              color: "#7F7F7F",
              marginLeft: "8px",
            }}
          >
            Transaction Time
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: "10px",
        }}
      >
        <JumpIcon width={20} height={20} fill="#7F7F7F" />
      </Box>
    </Card>
  );
};

export default Overview;
