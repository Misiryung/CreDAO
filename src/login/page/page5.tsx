import React from "react";
import { Box, Typography } from "@mui/material";
import ImportPrivatekey from "../components/importprivatekey";
import CreatedButtons from "../button/createdbutton";

interface Page5Props {
  onBack4: () => void;
}

const Page5: React.FC<Page5Props> = ({ onBack4 }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
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
        确认助记词
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          gap: "5px",
        }}
      >
        <Typography
          variant="body1"
          style={{
            fontSize: "18px",
            color: "#000",
            textAlign: "left",
            marginRight: "auto",
          }}
        >
          请在私密环境中完成此步骤
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: "16px",
            color: "#FF0000",
            textAlign: "left",
            marginRight: "auto",
          }}
        >
          私钥、助记词一旦泄露，资产即可被他人掌控
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <ImportPrivatekey />
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "80px",
        }}
      >
        <CreatedButtons onBack4={onBack4} />
      </Box>
    </Box>
  );
};

export default Page5;
