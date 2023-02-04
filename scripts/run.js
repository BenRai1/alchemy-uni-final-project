const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("AiNft");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  let txn;
  const uri = "QmbDLofw6tv5j5xMwJsY99x5UxFMMyKrrSrGm8CZVyBJYM";

  txn = await nftContract.safeMint(uri);
  await txn.wait();
  console.log(txn);

  txn = await nftContract.tokenURI(0);
  console.log("URI of Nft", txn);
};

const runMain = async () => {
  try {
    await main();

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
module.exports.tags = ["localnet"];
