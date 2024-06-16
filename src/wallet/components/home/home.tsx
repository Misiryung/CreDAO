import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import { Box, Menu, Typography, IconButton } from "@mui/material";
import { BuyIcon, SendIcon, ExtractIcon } from "./icons";
import TransactionList from "./list/frame";
import { useWallet } from "../../zhien/walletcontext";
import { formatBalance } from "../../zhien/transform";
import { fetchGoldToCNYPrice } from "./api";
import Buy1 from "../transaction/buy1";
import Buy2 from "../transaction/buy2";
import Extract1 from "../transaction/extract1";
import Extract2 from "../transaction/extract2";
import Send1 from "../transaction/send1";
import Send2 from "../transaction/send2";

interface WalletHomeProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const WalletHome: React.FC<WalletHomeProps> = ({
  anchorEl,
  open,
  handleClose,
}) => {
  const sectionStyles = {
    width: "100%",
    height: "160px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "80px",
  };

  const actionBoxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  };

  const ActionItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }> = ({ icon, label, onClick }) => (
    <Box sx={actionBoxStyles}>
      <IconButton sx={{ padding: 0 }} onClick={onClick}>
        {icon}
      </IconButton>
      <Typography variant="h1" sx={{ fontSize: "14px", fontWeight: "normal" }}>
        {label}
      </Typography>
    </Box>
  );

  const { balance } = useWallet();
  const [goldToCNYPrice, setGoldToCNYPrice] = useState(null);

  useEffect(() => {
    fetchGoldToCNYPrice().then((priceInfo) => {
      setGoldToCNYPrice(priceInfo);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState("WalletHome");

  const NavigateToPage = (page: string) => {
    setCurrentPage(page);
  };

  const [inputBalanceValue, setInputBalanceValue] = useState("");
  const [inputAddressValue, setInputAddressValue] = useState("");

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
          maxWidth: "100%",
          maxHeight: "100%",
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
        {currentPage === "WalletHome" ? (
          <>
            <Box sx={sectionStyles}>
              <Typography
                variant="h1"
                sx={{ fontSize: "30px", fontWeight: "normal" }}
              >
                {formatBalance(balance?.toString() || "0")} ZHEN
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "16px",
                  marginTop: "10px",
                  fontWeight: "normal",
                }}
              >
                ¥{" "}
                {(
                  Number(formatBalance(balance?.toString() || "0")) *
                  (goldToCNYPrice || 0)
                ).toFixed(3)}{" "}
                CNY
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "50px",
                  marginTop: "30px",
                }}
              >
                <ActionItem
                  icon={
                    <BuyIcon
                      width={36}
                      height={36}
                      fill1="#2196F3"
                      fill2="#FFFFFF"
                    />
                  }
                  label="购买"
                  onClick={() => NavigateToPage("Buy1")}
                />
                <ActionItem
                  icon={
                    <SendIcon
                      width={36}
                      height={36}
                      fill1="#2196F3"
                      fill2="#FFFFFF"
                    />
                  }
                  label="发送"
                  onClick={() => NavigateToPage("Send1")}
                />
                <ActionItem
                  icon={
                    <ExtractIcon
                      width={36}
                      height={36}
                      fill1="#2196F3"
                      fill2="#FFFFFF"
                    />
                  }
                  label="提取"
                  onClick={() => NavigateToPage("Extract1")}
                />
              </Box>
            </Box>
            <TransactionList />
          </>
        ) : (
          currentPage === "Buy1" && (
            <Buy1
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              handleReturn={() => NavigateToPage("WalletHome")}
              handleNext={() => NavigateToPage("Buy2")}
              setInputBalanceValue={setInputBalanceValue}
            />
          )
        )}
        {currentPage === "Buy2" && (
          <Buy2
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            inputValue={inputBalanceValue}
            handleReturn={() => NavigateToPage("Buy1")}
            handleComplete={() => NavigateToPage("WalletHome")}
          />
        )}
        {currentPage === "Extract1" && (
          <Extract1
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            handleReturn={() => NavigateToPage("WalletHome")}
            handleNext={() => NavigateToPage("Extract2")}
            setInputValue={setInputBalanceValue}
          />
        )}
        {currentPage === "Extract2" && (
          <Extract2
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            inputValue={inputBalanceValue}
            handleReturn={() => NavigateToPage("Extract1")}
            handleComplete={() => NavigateToPage("WalletHome")}
          />
        )}
        {currentPage === "Send1" && (
          <Send1
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            handleReturn={() => NavigateToPage("WalletHome")}
            handleNext={() => NavigateToPage("Send2")}
            setInputBalanceValue={setInputBalanceValue}
            setInputAddressValue={setInputAddressValue}
          />
        )}
        {currentPage === "Send2" && (
          <Send2
            anchorEl={anchorEl}
            open={open}
            handleClose={handleClose}
            inputBalanceValue={inputBalanceValue}
            inputAddressValue={inputAddressValue}
            handleReturn={() => NavigateToPage("Send1")}
            handleComplete={() => NavigateToPage("WalletHome")}
          />
        )}
      </Box>
    </Menu>
  );
};

export default WalletHome;
