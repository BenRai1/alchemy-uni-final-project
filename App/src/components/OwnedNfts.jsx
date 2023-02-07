const ownedNft = (nft, baseURL) => {
    const tokenId = nft.tokenId
    const link = `${baseURL}/${tokenId}`
    return (
        <div className="ownedNft">
            <a href={link} target="_blank">
                <img className="ownedNftsImage" src={nft.media[0].raw} alt="" />
            </a>
        </div>
    )
}

export default ownedNft
