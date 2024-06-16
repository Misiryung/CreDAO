import React from "react";
import { Box, Typography } from "@mui/material";
import { formatAddress } from "../../zhien/transform";
import DetailIcon from "../../../video/components/video/icons";
import { useWallet } from "../../zhien/walletcontext";

const Navbar: React.FC<{}> = () => {
  const headerStyles = {
    width: "100%",
    height: "60px",
    position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "center",
    boxShadow: "0px 4px 8px #f2f2f2",
    justifyContent: "space-between",
  };

  const { address } = useWallet();

  return (
    <Box sx={headerStyles}>
      {address ? (
        <Box
          sx={{
            width: "120px",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginLeft: "20px",
              marginRight: "10px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#FCD271",
            }}
          />
          <Typography
            variant="h1"
            sx={{ fontSize: "14px", fontWeight: "normal" }}
          >
            已连接
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "120px",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginLeft: "20px",
              marginRight: "8px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#D9D9D9",
            }}
          />
          <Typography
            variant="h1"
            sx={{ fontSize: "14px", fontWeight: "normal" }}
          >
            未连接
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          width: "120px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          backgroundColor: "#2196F320",
          padding: "0 10px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "14px",
            fontWeight: "normal",
            color: "#2196F3",
          }}
        >
          {address ? formatAddress(address) : "无法获取地址"}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "120px",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <DetailIcon fill="#000" width={16} height={16} />
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
