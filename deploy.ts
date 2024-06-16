import { ethers } from "hardhat";

async function main() {
  // 部署 CASP 合约
  const CASPFactory = await ethers.getContractFactory("contracts/CASP.sol:CASP");
  const casp = await CASPFactory.deploy();
  await casp.deployed();

  console.log("CASP deployed to:", casp.address);

  // 部署 VEP 合约，并传入 CASP 合约的地址
  const VEPFactory = await ethers.getContractFactory("contracts/VEP.sol:VEP");
  const vep = await VEPFactory.deploy(casp.address);
  await vep.deployed();

  console.log("VEP deployed to:", vep.address);
}

// 使用 async/await 模式处理错误
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
