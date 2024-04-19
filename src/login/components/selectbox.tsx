import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { SelectedIcon, UnselectedIcon } from "../icons";

const SelectBox = () => {
  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        "& > :not(:last-child)": {
          marginRight: "10px",
        },
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        onClick={toggleChecked}
      >
        {checked ? (
          <SelectedIcon width={16} height={16} fill="#000" />
        ) : (
          <UnselectedIcon width={16} height={16} fill="#000" />
        )}
      </Box>
      <Typography
        variant="body1"
        style={{
          fontSize: "16px",
          color: "#000",
        }}
      >
        信任此设备
      </Typography>
    </Box>
  );
};

export default SelectBox;
