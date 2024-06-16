import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import {
  NavigationIcon,
  HomeIcon,
  HomeFilledIcon,
  SubscriptionsIcon,
  SubscriptionsFilledIcon,
  CollectionsIcon,
  CollectionsFilledIcon,
  HistoryIcon,
  HistoryFilledIcon,
  NotificationsIcon,
  NotificationsFilledIcon,
} from "./icons";

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
  width: `calc(${theme.spacing(8)})`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

interface Category {
  name: string;
  iconType1: JSX.Element;
  iconType2: JSX.Element;
}

const categories: Category[] = [
  {
    name: "首页",
    iconType1: <HomeFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <HomeIcon fill="#000" width={24} height={24} />,
  },
  {
    name: "关注",
    iconType1: <SubscriptionsFilledIcon width={24} height={24} />,
    iconType2: <SubscriptionsIcon width={24} height={24} />,
  },
  {
    name: "收藏",
    iconType1: <CollectionsFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <CollectionsIcon fill="#000" width={24} height={24} />,
  },
  {
    name: "历史",
    iconType1: <HistoryFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <HistoryIcon fill="#000" width={24} height={24} />,
  },
  {
    name: "通知",
    iconType1: <NotificationsFilledIcon fill="#000" width={24} height={24} />,
    iconType2: <NotificationsIcon fill="#000" width={24} height={24} />,
  },
];

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
      <Divider />
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.name}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setSelectedCategory(category.name)}
          >
            <ListItemButton
              disableRipple
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                background: category.name === selectedCategory ? "#D9D9D9" : undefined,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {selectedCategory === category.name
                  ? category.iconType1
                  : category.iconType2}
              </ListItemIcon>
              <ListItemText
                primary={category.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default MiniDrawer;
