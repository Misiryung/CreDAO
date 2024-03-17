import React, { useState } from "react";
import { Box, Tabs, Tab, styled } from "@mui/material";
import Overview from "./overview";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #f2f2f2",
  "& .MuiTabs-indicator": {
    backgroundColor: "#2196F3",
  },
});

const AntTab = styled(({ label, ...props }: { label: string }) => (
  <Tab label={label} disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "#2196F3",
  "&.Mui-selected": {
    color: "#2196F3",
    fontWeight: "bold",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "transparent",
  },
  "&.MuiTab-textColorPrimary": {
    fontWeight: "bold",
  },
}));

function TransactionList() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "280px",
        height: "220px",
        border: "2px solid #f2f2f2",
        borderRadius: "20px",
      }}
    >
      <Box sx={{ borderBottom: "2px solid #f2f2f2" }}>
        <AntTabs value={value} onChange={handleChange}>
          <AntTab
            label="广告奖励"
            sx={{
              flex: "1",
              fontWeight: "bold",
              color: "black",
            }}
          />
          <AntTab
            label="交易记录"
            sx={{
              flex: "1",
              fontWeight: "bold",
              color: "black",
            }}
          />
        </AntTabs>
      </Box>
      <Overview />
    </Box>
  );
}

export default TransactionList;
