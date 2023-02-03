const createMetadata = (imageLink, number) => {
    const metaData = JSON.stringify({
        description: "Use your own prompts and AI generated images to creat an NFT you like",
        image: `${imageLink}`,
        name: `AI NFT Nr. ${number}`,
        attributes: [
            {
                trait_type: "Animal",
                value: "Mutant Ape",
            },
            {
                trait_type: "Number",
                value: "787",
            },
        ],
    })
    return metaData
}

export default createMetadata
