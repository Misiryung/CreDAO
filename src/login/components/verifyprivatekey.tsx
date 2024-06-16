import React, { useState } from "react";
import { Box, styled, TextField, InputAdornment, Paper } from "@mui/material";
import { VisibilityIcon, VisibilityOffIcon } from "../icons";
import CreatedButtons from "../button/createdbutton";

const PrivatekeyTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#000",
      borderWidth: "1.2px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: "1.6px",
    },
  },
});

const PrivatekeyPaper = styled(Paper)({
  padding: "2%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "1.2px solid black",
  borderRadius: "10px",
  boxShadow: "none",
  "> *:not(:last-child)": {
    marginBottom: "2%",
  },
});

interface VerifyPrivatekeyProps {
  onBack4: () => void;
}

const VerifyPrivatekey: React.FC<VerifyPrivatekeyProps> = ({ onBack4 }) => {
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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PrivatekeyPaper>
        {[0, 1, 2, 3].map((row) => (
          <Box
            key={row}
            display="flex"
            justifyContent="space-between"
            mb={row !== 3 ? 2 : 0}
            alignItems="center"
          >
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Box key={index} width="32%">
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
      </PrivatekeyPaper>
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

export default VerifyPrivatekey;
