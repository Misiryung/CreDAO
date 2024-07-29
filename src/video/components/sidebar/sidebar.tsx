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
        width: "6vw",
        height: "92vh",
        position: "fixed",
        overflowY: "auto",
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
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                px: 2,
                py: 2,
                mx: "5px",
                "&:hover": {
                  background: "#f0f0f0",
                },
              }}
            >
              <ListItemIcon
                sx={{
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
                  mt: "5px",
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
