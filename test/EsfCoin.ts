import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("EsfCoin Tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const EsfCoin = await hre.ethers.getContractFactory("EsfCoin");
    const esfCoin = await EsfCoin.deploy();

    return { esfCoin, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should have correct name", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const name = await esfCoin.name();
      expect(name).to.equal("EsfCoin");
    });

    it("Should have correct symbol", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const symbol = await esfCoin.symbol();
      expect(symbol).to.equal("ESF");
    });

    it("Should have correct symbol", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const symbol = await esfCoin.symbol();
      expect(symbol).to.equal("ESF");
    });

    it("Should have correct decimals", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const decimals = await esfCoin.decimals();
      expect(decimals).to.equal(18);
    });

    it("Should have correct totalSupply", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const totalSupply = await esfCoin.totalSupply();
      expect(totalSupply).to.equal(1000n * 10n ** 18n);
    });

    it("Should get balance", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balance = await esfCoin.balanceOf(owner.address);
      expect(balance).to.equal(1000n * 10n ** 18n);
    });

    it("Should transfer", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await esfCoin.balanceOf(owner.address);
      const balanceOtherBefore = await esfCoin.balanceOf(otherAccount.address);

      await esfCoin.transfer(otherAccount.address, 1n);

      const balanceOwnerAfter = await esfCoin.balanceOf(owner.address);
      const balanceOtherAfter = await esfCoin.balanceOf(otherAccount.address);
      expect(balanceOwnerBefore).to.equal((1000n * 10n ** 18n));
      expect(balanceOwnerAfter).to.equal((1000n * 10n ** 18n) - 1n);
      expect(balanceOtherBefore).to.equal(0);
      expect(balanceOtherAfter).to.equal(1);
    });

    it("Should NOT transfer", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const totalSupply = await esfCoin.totalSupply();
      await expect(esfCoin.transfer(otherAccount.address, (totalSupply + 1n)))
        .to.be
        .revertedWithCustomError(esfCoin, "ERC20InsufficientBalance");
    });

    it("Should approve", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      await esfCoin.approve(otherAccount.address, 1n);
      const value = await esfCoin.allowance(owner.address, otherAccount.address)
      expect(value).to.equal(1n);
    });

    it("Should transfer from", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);
      const balanceOwnerBefore = await esfCoin.balanceOf(owner.address);
      const balanceOtherBefore = await esfCoin.balanceOf(otherAccount.address);

      await esfCoin.approve(otherAccount.address, 10n);
      const instance = esfCoin.connect(otherAccount);
      await instance.transferFrom(owner.address, otherAccount.address, 5n);

      const balanceOwnerAfter = await esfCoin.balanceOf(owner.address);
      const balanceOtherAfter = await esfCoin.balanceOf(otherAccount.address);
      const allowance = await esfCoin.allowance(owner.address, otherAccount.address)

      expect(balanceOwnerBefore).to.equal((1000n * 10n ** 18n));
      expect(balanceOwnerAfter).to.equal((1000n * 10n ** 18n) - 5n);
      expect(balanceOtherBefore).to.equal(0);
      expect(balanceOtherAfter).to.equal(5);
      expect(allowance).to.equal(5);
    });

    it("Should NOT transfer from (balance)", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);

      const instance = esfCoin.connect(otherAccount);
      await instance.approve(owner.address, 5n);

      await expect(esfCoin.transferFrom(otherAccount.address, owner.address, 5n))
        .to.be
        .revertedWithCustomError(esfCoin, "ERC20InsufficientBalance");
    });

    it("Should NOT transfer from (allowance)", async function () {
      const { esfCoin, owner, otherAccount } = await loadFixture(deployFixture);

      const instance = esfCoin.connect(otherAccount);
      await expect(instance.transferFrom(owner.address, otherAccount.address, 5n))
        .to.be
        .revertedWithCustomError(esfCoin, "ERC20InsufficientAllowance");
    });
  });
});
