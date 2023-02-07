# Minting an NFT where the picture is created by AI (Dall e)

This Project demostrates how AI can be used to generate Pictures and mint them as an NFT.

The prject uses the following tech stack:

1. Solidity for writing the smart contract and deploying it to the Goerli Testnet

2. Vite, React, HTML, JavaScripot and CSS for the minting website

3. Ethers for connecting the website with the smart contract and interecting with it

4. Several APIs:
   - OpenAi API for Dalle to generate the example images for the NFT
   - Infura API to upload the images and the metadata of the NFTs to IPFS
   - Alchemy API for getting the NFTs the wallet already minted

To try it out download the repo from

https://github.com/BenRai1/alchemy-uni-final-project.git

Set up the .env file for the smartcontract with the following data:
(Make sure the variables are called the same)

ALCHEMY_GOERLI_RPC_URL => make an account and get it at https://www.alchemy.com/
GOERLI_PRIVATE_KEY => the private Key of the Etherium account you want to use
ETHERSCAN_API_KEY => make an account and get it at https://goerli.etherscan.io/

Set up the .env file for the App (./App/.env) with the following data:
(Make sure the variables are called the same)

VITE_OPENAI_API_KEY => make an account and get it at https://www.infura.io/
VITE_INFURA_PORJECT_ID => make an account and get it at https://www.infura.io/
VITE_INFURA_API_KEY_SECRET => make an account and get it at https://www.infura.io/
VITE_ALCHEMY_API_KEY => make an account and get it at https://www.alchemy.com/

Once you are done do the following:

Run in the main folder:

- npm install
- yarn hardhat run script/deploy.js --network goerlie

Copy the contract address of the contract you just deployed from the console and past it into ./App/App.jsx as the variable CONTRACT_ADDRESS_AINFT

Run in the App folder:

- npm run dev

Go to http://localhost:5173/ and have fun minting

If you want to adjust the prompt for the pictures you can do this in App.jsx file in line 95

- const prompt = `A realistic photographic close up of a ${value1} made out of ${value2} `
