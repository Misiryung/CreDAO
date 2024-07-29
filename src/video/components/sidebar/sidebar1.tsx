import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { categories } from "./categories";

interface SideBarProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SideBar: React.FC<SideBarProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <List
      sx={{
        width: "18vw",
        height: "100%",
        backgroundColor: "#FFF",
      }}
    >
      {categories.map((category) => {
        const isSelected = category.name === selectedCategory;

        return (
          <ListItem key={category.name} disablePadding>
            <ListItemButton
              disableRipple
              onClick={() => setSelectedCategory(category.name)}
              sx={{
                background:
                  category.name === selectedCategory
                    ? "#D9D9D9"
                    : "transparent",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                mx: "1vw",
                "&:hover": {
                  background: "#f0f0f0",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  width: "6vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isSelected ? category.iconType1 : category.iconType2}
              </ListItemIcon>
              <Typography
                sx={{
                  fontFamily:
                    '"Your Custom Font", "Microsoft YaHei", sans-serif',
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {category.name}
              </Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SideBar;
