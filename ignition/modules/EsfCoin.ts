import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const EsfCoinModule = buildModule("EsfCoinModule", (m) => {

  const esfCoin = m.contract("EsfCoin");

  return { esfCoin };
});

export default EsfCoinModule;
