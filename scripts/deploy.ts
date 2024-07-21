import { ethers } from "hardhat";

async function main() {
  const esfCoin = await ethers.deployContract("EsfCoin");
  await esfCoin.waitForDeployment();
  console.log(`Contract deployed at ${esfCoin.target}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });