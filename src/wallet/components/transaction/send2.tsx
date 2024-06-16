import React, { useState, useEffect } from "react";
import Navbar from "../home/navbar";
import { Box, Menu, Typography, Divider } from "@mui/material";
import { RemindIcon } from "../home/icons";
import CompleteButtons from "./button/completebutton";
import { useWallet } from "../../zhien/walletcontext";
import {
  formatBalance,
  formatGasPrice,
  formatGasPrice1,
} from "../../zhien/transform";
import { fetchGoldToCNYPrice } from "../home/api";

interface Send2Props {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleReturn: () => void;
  handleComplete: () => void;
  inputBalanceValue: string;
  inputAddressValue: string;
}

const Send2: React.FC<Send2Props> = ({
  anchorEl,
  open,
  handleClose,
  handleReturn,
  handleComplete,
  inputBalanceValue,
  inputAddressValue,
}) => {
  const { gasPrice, sendTransaction } = useWallet();

  const [goldToCNYPrice, setGoldToCNYPrice] = useState<number | null>(null);

  useEffect(() => {
    fetchGoldToCNYPrice().then((priceInfo) => {
      setGoldToCNYPrice(priceInfo);
    });
  }, []);

  const handleSendTransaction = async () => {
    const amountToSend = parseFloat(inputBalanceValue);
    await sendTransaction(parseFloat(inputBalanceValue), inputAddressValue);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        style: {
          width: 360,
          height: 560,
          marginTop: "10px",
          borderRadius: "20px",
        },
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Navbar />
        <Box
          sx={{
            width: "100%",
            height: "110px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "1.2px solid #D9D9D9",
            backgroundColor: "#F2F2F2",
            marginTop: "50px",
            gap: "8px",
          }}
        >
          <Box
            sx={{
              width: "110px",
              height: "24px",
              marginLeft: "20px",
              border: "1.2px solid #D9D9D9",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: "13px", fontWeight: "normal" }}
            >
              正在发送 ZHEN
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              marginLeft: "20px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {inputBalanceValue} ZHEN
          </Typography>

          <Typography
            variant="h1"
            sx={{
              marginLeft: "20px",
              fontSize: "13px",
              fontWeight: "normal",
              color: "#7F7F7F",
            }}
          >
            ¥{" "}
            {(
              Number(formatBalance(inputBalanceValue?.toString() || "0")) *
              (goldToCNYPrice || 0)
            ).toFixed(3)}{" "}
            CNY
          </Typography>
        </Box>

        <Box
          sx={{
            width: "320px",
            height: "160px",
            display: "flex",
            marginTop: "30px",
            textAlign: "left",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                网络资源费
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "14px",
                  color: "#7F7F7F",
                  fontWeight: "normal",
                }}
              >
                (实时)
              </Typography>
              <RemindIcon width={18} height={18} fill="#7F7F7F" />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#7F7F7F",
                }}
              >
                ¥{" "}
                {(
                  Number(formatGasPrice1(gasPrice?.toString() || "0")) *
                  (goldToCNYPrice || 0)
                ).toFixed(3)}{" "}
                CNY
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                }}
              >
                {formatGasPrice(gasPrice?.toString() || "0")} ZHEN
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#28A76F",
              }}
            >
              大概在 10秒 以内
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#7F7F7F",
                }}
              >
                最大费用:
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#7F7F7F",
                }}
              >
                {formatGasPrice1(gasPrice?.toString() || "0")} ZHEN
              </Typography>
            </Box>
          </Box>

          <Divider
            sx={{
              height: "1px",
              marginTop: "30px",
              marginBottom: "30px",
              backgroundColor: "#D9D9D9",
            }}
          />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              共计
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "10px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#7F7F7F",
                }}
              >
                ¥{" "}
                {(
                  (parseFloat(inputBalanceValue) +
                    parseFloat(formatGasPrice(gasPrice?.toString() || "0"))) *
                  (goldToCNYPrice || 0)
                ).toFixed(3)}{" "}
                CNY
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                }}
              >
                {parseFloat(inputBalanceValue) +
                  parseFloat(formatGasPrice(gasPrice?.toString() || "0"))}{" "}
                ZHEN
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "13px",
                fontWeight: "normal",
                color: "#7F7F7F",
              }}
            >
              金额+网络资源费
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "5px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: "#7F7F7F",
                }}
              >
                最大费用:
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "13px",
                  fontWeight: "normal",
                  color: "#7F7F7F",
                }}
              >
                {parseFloat(inputBalanceValue) +
                  parseFloat(formatGasPrice1(gasPrice?.toString() || "0"))}{" "}
                ZHEN
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              marginTop: "90px",
            }}
          >
            <CompleteButtons
              onReturn={handleReturn}
              onComplete={handleComplete}
              sendTransaction={handleSendTransaction}
            />
          </Box>
        </Box>
      </Box>
    </Menu>
  );
};

export default Send2;
