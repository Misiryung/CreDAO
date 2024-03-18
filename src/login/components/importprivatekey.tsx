import React, { useState } from "react";
import { Box, styled, TextField, InputAdornment, Paper } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";

const PrivatekeyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#000",
      borderWidth: "1.6px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: "2px",
    },
  },
});

const CustomPaper = styled(Paper)({
  padding: "5%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "1.6px solid black",
  borderRadius: "10px",
  boxShadow: "none", // Remove shadow
});

export default function ImportPrivatekey() {
  const [showPasswords, setShowPasswords] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const handleClickShowPassword = (index: number) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  return (
    <CustomPaper>
      {[0, 1, 2, 3].map((row) => (
        <Box
          key={row}
          display="flex"
          justifyContent="space-between"
          mb={row !== 3 ? 2 : 0} // Add margin-bottom to all rows except the last one
          alignItems="center"
        >
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Box key={index} width="30%">
                <PrivatekeyTextField
                  id={`password-${index}`}
                  type={showPasswords[index] ? "text" : "password"}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          component="button"
                          aria-label="toggle password visibility"
                          alignItems="center"
                          onClick={() => handleClickShowPassword(index)}
                          sx={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          {showPasswords[index] ? (
                            <VisibilityIcon
                              width={20}
                              height={20}
                              fill="#000"
                            />
                          ) : (
                            <VisibilityOffIcon
                              width={20}
                              height={20}
                              fill="#000"
                            />
                          )}
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            );
          })}
        </Box>
      ))}
    </CustomPaper>
  );
}
