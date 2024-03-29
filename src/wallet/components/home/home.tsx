import React from "react";
import { Box, Menu, Typography, IconButton } from "@mui/material";
import { CopyIcon, ZHENLogo, BuyIcon, SendIcon, ExtractIcon } from "./icons";
import TransactionList from "./list/frame";

interface WalletHomeProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const WalletHome: React.FC<WalletHomeProps> = ({
  anchorEl,
  open,
  handleClose,
}) => {

  const headerStyles = {
    width: "100%",
    height: "40px",
    position: "absolute",
    top: 0,
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid #f2f2f2",
    justifyContent: "space-between",
  };

  const sectionStyles = {
    width: "100%",
    height: "220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
  };

  const actionBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  };

  const ActionItem: React.FC<{ icon: React.ReactNode; label: string }> = ({
    icon,
    label,
  }) => (
    <Box sx={actionBoxStyles}>
      <IconButton sx={{ padding: 0 }}>{icon}</IconButton>
      <Typography variant="h1" sx={{ fontSize: "14px", fontWeight: "bold" }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: 300,
          maxWidth: "100%",
          maxHeight: "100%",
          height: 500,
          marginTop: "10px",
          borderRadius: "10px",
        },
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={headerStyles}>
          <Box
            sx={{
              width: "130px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              marginLeft: "8px",
              border: "2px solid #f2f2f2",
              borderRadius: "12px",
              position: "relative",
            }}
          >
            <span
              style={{
                marginLeft: "9px",
                marginRight: "9px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#FCD271",
              }}
            />
            <Typography
              variant="h1"
              sx={{ fontSize: "13px", fontWeight: "bold" }}
            >
              CreDAO Chain
            </Typography>
          </Box>
          <Box
            sx={{
              width: "130px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginRight: "12px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                marginRight: "5px",
              }}
            >
              Account Address
            </Typography>
            <CopyIcon fill="#7F7F7F" width={18} height={18} />
          </Box>
        </Box>

        <Box sx={sectionStyles}>
          <Box sx={{ marginTop: "10px", marginBottom: "15px" }}>
            <ZHENLogo width={40} height={40} />
          </Box>
          <Typography
            variant="h1"
            sx={{ fontSize: "28px", fontWeight: "bold" }}
          >
            0 ZHEN
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            ¥ 0 CNY
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "40px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            <ActionItem
              icon={
                <BuyIcon
                  width={32}
                  height={32}
                  fill1="#2196F3"
                  fill2="#FFFFFF"
                />
              }
              label="购买"
            />
            <ActionItem
              icon={
                <SendIcon
                  width={32}
                  height={32}
                  fill1="#2196F3"
                  fill2="#FFFFFF"
                />
              }
              label="发送"
            />
            <ActionItem
              icon={
                <ExtractIcon
                  width={32}
                  height={32}
                  fill1="#2196F3"
                  fill2="#FFFFFF"
                />
              }
              label="提取"
            />
          </Box>
        </Box>
        <TransactionList />
      </Box>
    </Menu>
  );
};

export default WalletHome;
