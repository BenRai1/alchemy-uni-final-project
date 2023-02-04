const { ethers, run, network } = require("hardhat");

const main = async () => {
  const nftContractFactory = await ethers.getContractFactory("AiNft");
  console.log("Deploying contract...");
  const nftContract = await nftContractFactory.deploy();
  console.log("Waiting for contract to finish deploying");
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 3 block to pass...");
    await nftContract.deployTransaction.wait(3);
    console.log("verifying contract...");
    await verify(nftContract.address, []);
  }
};

const verify = async (contractaddress, args) => {
  console.log("Varifying Contract...");
  try {
    await run("verify:verify", {
      address: contractaddress,
      constructorArguments: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already varified");
    } else {
      console.log(error);
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

module.exports.tags = ["testnet"];
