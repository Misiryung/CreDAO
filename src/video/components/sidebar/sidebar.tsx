import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import { Typography } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import { categories } from "./categories";
import { NavigationIcon } from "./icons";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: "80px",
  overflowX: "hidden",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  padding: "8px 0",
}));

const openedButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  px: 2.5,
  py: 1.5,
  marginLeft: "8px",
  marginRight: "8px",
};

const closedButtonStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  px: 2.5,
  py: 2,
  marginLeft: "5px",
  marginRight: "5px",
};

const openedIconStyles = {
  display: "flex",
  justifyContent: "flex-start",
  marginLeft: "0px",
};

const closedIconStyles = {
  display: "flex",
  justifyContent: "center",
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 1200,
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      border: "none",
    },
    "& .drawer-footer": {
      display: "block",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      border: "none",
    },
    "& .drawer-footer": {
      display: "none",
    },
  }),
}));

interface MiniDrawerProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar: React.FC<MiniDrawerProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <NavigationIcon fill="#000" width={24} height={24} />
          </IconButton>
        </DrawerHeader>
        <List>
          {categories.map((category) => (
            <ListItem key={category.name} disablePadding>
              <ListItemButton
                disableRipple
                sx={{
                  background:
                    category.name === selectedCategory
                      ? "#D9D9D9"
                      : "transparent",
                  borderRadius: "10px",
                  ...(open ? openedButtonStyles : closedButtonStyles),
                }}
              >
                <ListItemIcon
                  sx={{
                    ...(open ? openedIconStyles : closedIconStyles),
                  }}
                >
                  {selectedCategory === category.name
                    ? category.iconType1
                    : category.iconType2}
                </ListItemIcon>
                <Typography
                  sx={{
                    fontFamily:
                      '"Your Custom Font", "Microsoft YaHei", sans-serif',
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    ...(open ? { marginLeft: "0px" } : { marginTop: "5px" }),
                  }}
                >
                  {category.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SideBar;
