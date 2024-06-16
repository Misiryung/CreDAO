import React from "react";
import { Box, Typography } from "@mui/material";
import { CopyIcon, ZHENLogo, JumpIcon } from "../icons";
import { useWallet } from "../../../zhien/walletcontext";
import {
  formatTimestamp1,
  formatBalance,
  formatAddress,
} from "../../../zhien/transform";

const Overview: React.FC = () => {
  const { transactions } = useWallet();

  return (
    <>
      {transactions.map((transaction) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 320,
            height: 50,
            borderBottom: "1px solid #f2f2f2",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "13px",
              marginRight: "13px",
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
            <Typography variant="h1" sx={{ fontSize: "16px" }}>
              {formatBalance(transaction.amount?.toString())} ZHEN
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "3px",
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
                {formatAddress(transaction.from)}
              </Typography>
              <CopyIcon width={14} height={14} fill="#7F7F7F" />
              <Typography
                variant="h1"
                sx={{
                  fontSize: "12px",
                  color: "#7F7F7F",
                  marginLeft: "10px",
                }}
              >
                {formatTimestamp1(transaction.timestamp?.toString())}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "13px",
            }}
          >
            <JumpIcon width={20} height={20} fill="#7F7F7F" />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Overview;
