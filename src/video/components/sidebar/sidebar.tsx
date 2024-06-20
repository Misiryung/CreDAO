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
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "70px",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "70px",
  padding: "8px 0",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const MiniDrawer: React.FC<MiniDrawerProps> = ({
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
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          <NavigationIcon fill="#000" width={24} height={24} />
        </IconButton>
      </DrawerHeader>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.name}
            disablePadding
            sx={{ display: "block", position: "relative" }}
            onClick={() => setSelectedCategory(category.name)}
          >
            <ListItemButton
              disableRipple
              sx={{
                minHeight: 48,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2.5,
                py: 2,
                marginLeft: "3px",
                marginRight: "3px",
                background:
                  category.name === selectedCategory ? "#D9D9D9" : undefined,
                borderRadius: "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mb: open ? 1 : 0,
                  justifyContent: "center",
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
                }}
              >
                {category.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography
        variant="body2"
        className="drawer-footer"
        sx={{
          textAlign: "center",
          color: "#7F7F7F",
          fontFamily: '"Your Custom Font", "Microsoft YaHei", sans-serif',
          fontSize: "14px",
          fontWeight: 400,
          marginTop: "auto",
          padding: "16px",
        }}
      >
        © CreDAO Users Version
      </Typography>
    </Drawer>
  );
};

export default MiniDrawer;
