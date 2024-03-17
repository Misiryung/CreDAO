import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import AccountTextField from "../components/account";
import PasswordTextField from "../components/password";
import SelectBox from "../components/selectbox";
import LoginButtons from "../components/loginbutton";

const Page1: React.FC = () => {
  return (
    <Paper
      sx={{
        width: "25vw",
        height: "100vh",
        bgcolor: "#FFF",
        boxShadow: "none",
        borderRadius: 0,
        border: "none",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "16%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            style={{
              fontWeight: "bold",
              fontSize: "32px",
              color: "#000",
              textAlign: "left",
              marginRight: "auto",
            }}
          >
            欢迎回来
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontSize: "16px",
              color: "#7F7F7F",
              textAlign: "right",
              marginLeft: "auto",
            }}
          >
            验证码登录
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "80px",
            gap: "15px",
          }}
        >
          <AccountTextField />
          <PasswordTextField />
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "15px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center", // 添加此行以在垂直方向上居中
          }}
        >
          <SelectBox />
          <Typography
            variant="body1"
            style={{
              fontSize: "16px",
              color: "#000",
              textAlign: "right",
              marginLeft: "auto",
            }}
          >
            忘记密码
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            marginTop: "80px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center", // 添加此行以在垂直方向上居中
          }}
        >
          <LoginButtons />
        </Box>
      </Box>
    </Paper>
  );
};

export default Page1;
