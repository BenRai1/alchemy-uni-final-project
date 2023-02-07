// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


//uri(Linkt to Metadata): https://final-project-au.infura-ipfs.io/ipfs/QmbDLofw6tv5j5xMwJsY99x5UxFMMyKrrSrGm8CZVyBJYM
// deployed to: 0x9e9b71520A0a67A0853c987cE14925F20B531D2f

contract AiNft is ERC721, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public max_supply = 100;
    uint256 public MAX_MINT_PER_WALLET = 5;
    mapping(address => uint256) numberOfNftsOwned;
    mapping(address => uint256) numberNftsMinted;

    event NewAiNftMinted (address indexed minter, uint tokenId);

    constructor() ERC721("AiNft", "AIN") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://final-project-au.infura-ipfs.io/ipfs/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint( string memory uri) public whenNotPaused  {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId <= max_supply, "Sorry, all NFTs have been minted");
        require(
            numberNftsMinted[msg.sender] < MAX_MINT_PER_WALLET,
            "Sorry, you already minted all NFTs you are allowed to mint"
        );
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        numberOfNftsOwned[msg.sender]++;
        numberNftsMinted[msg.sender]++;
        emit NewAiNftMinted(msg.sender, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // -----------setter and getter functions --------------

    function setTotalSupply(uint256 _newTotalSupply) external onlyOwner {
            max_supply = _newTotalSupply;
        }

    function getCurrtenAiNftAmoundMinted() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function getNumberOfAiNftsOwned(address _senderAddress) public view returns (uint256) {
        return numberOfNftsOwned[_senderAddress];
    }

    function getNumberOfNftsMinted(address _address) public view returns (uint){
        return numberNftsMinted[_address];
    }

    function setMaxMintPerWallet(uint _max) public onlyOwner{
        MAX_MINT_PER_WALLET = _max;
    }


}