const { expect, assert } = require("chai");
const { it } = require("node:test");

describe("AiNft", function () {
  let contract;
  let accounts;
  describe("Testing AI Nft", async function () {
    beforeEach(async () => {
      //deploy contract
      const nftContractFactory = await hre.ethers.getContractFactory("AiNft");
      const nftContract = await nftContractFactory.deploy();
      await nftContract.deployed();
      // console.log("Contract deployed to:", nftContract.address)
      accounts = await ethers.getSigners();
    });
  });
});
