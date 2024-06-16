import React, { useState } from "react";
import { Stack, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../searchbar/searchbar";
import WalletHome from "../../../wallet/components/home/home";
import {
  NavigationIcon,
  Logo,
  WalletIcon,
  CreatorIcon,
  AdvertisementsIcon,
  AvatarIcon,
} from "./icons";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        position: "sticky",
        background: "#FFF",
        top: 0,
        height: "8vh",
      }}
    >
      <Stack direction="row" alignItems="center">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Logo width={24} height={24} />
          <span
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#2196F3",
              marginLeft: "5px",
            }}
          >
            CreDAO
          </span>
        </Link>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", alignItems: "center" }}
        style={{ width: "100%" }}
      >
        <SearchBar />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        spacing={1.6}
        marginRight="20px"
      >
        <IconButton sx={{ padding: 0 }} onClick={handleClick}>
          <WalletIcon width={28} height={28} />
        </IconButton>
        <IconButton sx={{ padding: 0 }}>
          <CreatorIcon width={28} height={28} />
        </IconButton>
        <IconButton sx={{ padding: 0 }}>
          <AdvertisementsIcon width={28} height={28} />
        </IconButton>
        <IconButton sx={{ padding: 0 }}>
          <Box
            component="span"
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "12px",
              backgroundColor: "#f2f2f2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AvatarIcon width={24} height={24} />
          </Box>
        </IconButton>
      </Stack>
      <WalletHome
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleClose}
      />
    </Stack>
  );
};

export default Navbar;
