import React from "react";
import { Box, Typography } from "@mui/material";
import AccountTextFields from ".././textfield/accounttextfield";
import PasswordTextFields from ".././textfield/passwordtextfield";
import SelectBox from "../components/selectbox";
import LoginButtons from ".././button/loginbutton";

interface Page1Props {
  onButtonClick1: () => void;
}

const Page1: React.FC<Page1Props> = ({ onButtonClick1 }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        <AccountTextFields />
        <PasswordTextFields />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
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
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LoginButtons onButtonClick1={onButtonClick1} />
      </Box>
    </Box>
  );
};

export default Page1;
