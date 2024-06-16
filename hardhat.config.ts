import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    zhien: {
      url: "http://192.168.1.8:8551",
    },
  },
};

export default config;
