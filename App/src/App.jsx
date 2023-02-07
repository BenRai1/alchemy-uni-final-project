import { useState, useEffect } from "react"
import { OptionDropdown } from "./components/OptionsDropdown"
import { Buffer } from "buffer"
import base64Example from "./components/base64"
import ipfs from "./components/ipfs"
import createMetadata from "./components/CreatMetadata"
import { Button, Spinner } from "@chakra-ui/react"
import AiNft from "./utils/AiNft.json"
import "./App.css"
import alchemy from "./components/Alchemy"
import openai from "./components/OpenAi"
import ownedNft from "./components/OwnedNfts"

import { connectToContract, setupEventListener } from "./components/HelpingFunctions"

const CONTRACT_ADDRESS_AINFT = "0x9e9b71520A0a67A0853c987cE14925F20B531D2f"
const aiNftContract = connectToContract(CONTRACT_ADDRESS_AINFT, AiNft.abi)

// https://ipfs.infura.io/ipfs/QmNkGQWQo7oxKUUpTvse9rEjzrjdWDAQMqzAmfRTGjSXCZ

//https://ipfs.infura-ipfs.io/ipfs/QmNkGQWQo7oxKUUpTvse9rEjzrjdWDAQMqzAmfRTGjSXCZ
// https://ipfs.infura.io:5001/api/v0/cat?arg=QmNkGQWQo7oxKUUpTvse9rEjzrjdWDAQMqzAmfRTGjSXCZ
// https://final-project-au.infura-ipfs.io/ipfs/QmbDLofw6tv5j5xMwJsY99x5UxFMMyKrrSrGm8CZVyBJYM

function App() {
    const dedicatedGatewayInfuria = "final-project-au"
    const baseURL = `https://testnets.opensea.io/assets/goerli/${CONTRACT_ADDRESS_AINFT}`

    // todo: State zusammenfassen und ein Array machen für links und Base64(??)

    const [maxMints, setMaxMints] = useState("?")
    const [alreadyMinted, setAlreadyMinted] = useState("?")
    const [prompt1, setPrompt1] = useState("")
    const [prompt2, setPrompt2] = useState("")
    const [nftsOwned, setNftsOwned] = useState([])

    const [imageLink1, setimageLink1] = useState("../src/assets/questionmark1.png")
    const [imageLink2, setimageLink2] = useState("../src/assets/questionmark2.png")
    const [imageLink3, setimageLink3] = useState("../src/assets/questionmark3.png")
    const [imageLink4, setimageLink4] = useState("../src/assets/questionmark4.png")
    const [imagesGenerated, setImagesGenerated] = useState(false)
    const [base64_1, setBase64_1] = useState("")
    const [base64_2, setBase64_2] = useState("")
    const [base64_3, setBase64_3] = useState("")
    const [base64_4, setBase64_4] = useState("")

    const [chosenBase64, setChosenBase64] = useState(base64Example)
    const [chosenPicture, setChosenPicture] = useState("")
    const [currentAccount, setCurrentAccount] = useState("")
    const [onGoerli, setOnGoerli] = useState(false)
    const [eventListener, setEventListener] = useState(false)
    const [selectionNotOk, setSelectionNotOk] = useState(false)
    const [mintingNft, setMintingNft] = useState(false)
    const [gneratingImages, setGeneratingImages] = useState(false)
    let options1 = [
        { value: "cat", name: "Cat" },
        { value: "dog", name: "Dog" },
        { value: "eagle", name: "Eagle" },
        { value: "wolf", name: "Wolf" },
        { value: "lion", name: "Lion" },
        { value: "elefant", name: "Elefant" },
        { value: "tiger", name: "Tiger" },
    ]
    let options2 = [
        { value: "water", name: "Water" },
        { value: "fire", name: "Fire" },
        { value: "lightning", name: "Lightning" },
        { value: "wind", name: "Wind" },
        { value: "earth", name: "Earth" },
    ]
    const alt =
        "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window
        if (!ethereum) {
            console.log("Make sure you have metamask!")
            return
        } else if (!eventListener) {
            setupEventListener(aiNftContract, AiNft.abi, "NewAiNftMinted")
            setEventListener(true)
            // console.log("We have the ethereum object", ethereum)
        }
        const accounts = await ethereum.request({ method: "eth_accounts" })
        const chainId = await ethereum.request({ method: "eth_chainId" })
        const goerliChaiId = "0x5"
        if (chainId !== goerliChaiId) {
            alert("You are not not the Goerli Test Network")
            setOnGoerli(false)
        } else {
            setOnGoerli(true)
        }
        if (accounts.length !== 0) {
            const account = accounts[0]
            // console.log("Found an authorized account: ", account)
            setCurrentAccount(account)
        } else {
            console.log("No autorized account found")
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window
            if (!ethereum) {
                console.log("Get Metamask")
                return
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            console.log("Connected ", accounts[0])
            setCurrentAccount(accounts[0])
            if (!eventListener) {
                setupEventListener(aiNftContract, AiNft.abi, "NewAiNftMinted")
                setEventListener(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const generateImage = async () => {
        setGeneratingImages(true)
        const value1 = document.getElementById("option1").value
        setPrompt1(value1)
        const value2 = document.getElementById("option2").value
        setPrompt2(value2)

        if (value1 == "" || value2 == "") {
            setSelectionNotOk(true)
        } else {
            setSelectionNotOk(false)
            const prompt = `A realistic photographic close up of a ${value1} made out of ${value2} `
            console.log(prompt)

            // const stringPrompt = prompt.toString()

            const response = await openai.createImage({
                prompt: prompt,
                n: 4,
                size: "1024x1024",
                response_format: "b64_json",
            })
            // console.log(response)

            setimageLink1("data:image/png;base64," + response.data.data[0].b64_json)
            setimageLink2("data:image/png;base64," + response.data.data[1].b64_json)
            setimageLink3("data:image/png;base64," + response.data.data[2].b64_json)
            setimageLink4("data:image/png;base64," + response.data.data[3].b64_json)

            setBase64_1(response.data.data[0].b64_json)
            setBase64_2(response.data.data[1].b64_json)
            setBase64_3(response.data.data[2].b64_json)
            setBase64_4(response.data.data[3].b64_json)

            setImagesGenerated(true)
            setGeneratingImages(false)
        }
    }

    const setChosenImage = (chosenBase64, imageId) => {
        setChosenBase64(chosenBase64)
        setChosenPicture(imageId)
        console.log(chosenPicture)
    }

    const mint = async () => {
        if (chosenPicture == "") {
            alert("Chose an image to mint as an NFT by clicking on it")
        } else {
            setMintingNft(true)
            // transforme the base64 data to data readable for to ipfs api
            let imageLink
            let cidMetadata
            const buffer = Buffer.from(chosenBase64, "base64")

            //upload chosen image to IPFS

            ipfs.add(buffer).then(async (result) => {
                imageLink = `https://${dedicatedGatewayInfuria}.infura-ipfs.io/ipfs/${result.path}`
                // imageLink = "https://final-project-au.infura-ipfs.io/ipfs/QmRuiAezX2vuGTG5mRbYwkxUFY5kHk2NYewFUNs1B6mWVG"
                console.log("image Link :", imageLink)
                const txn = await aiNftContract.getCurrtenAiNftAmoundMinted()
                const tokenId = parseInt(txn._hex, 16) + 1

                const metadata = createMetadata(imageLink, tokenId, prompt1, prompt2)
                ipfs.add(metadata).then(async (result) => {
                    const linkToMetatdata = `https://${dedicatedGatewayInfuria}.infura-ipfs.io/ipfs/${result.path}`
                    console.log("Link to metadata: ", linkToMetatdata)
                    cidMetadata = result.path
                    let newTxn = await aiNftContract.safeMint(cidMetadata)
                    console.log("Response minting", newTxn)
                    newTxn = await aiNftContract.getNumberOfNftsMinted(currentAccount)
                    const walletMinted = parseInt(newTxn._hex, 16)
                    setAlreadyMinted(walletMinted)
                    setMintingNft(false)
                    setImagesGenerated(false)
                    setChosenImage("")
                    resetImages()
                    getNftsOwned()
                })
            })

            // console.log(`https://${dedicatedGatewayInfuria}.infura-ipfs.io/ipfs/${metadataCid}`)
        }
    }

    const getInitialData = async () => {
        if (currentAccount) {
            let txn = await aiNftContract.MAX_MINT_PER_WALLET()
            const max = parseInt(txn._hex, 16)
            setMaxMints(max)

            txn = await aiNftContract.getNumberOfNftsMinted(currentAccount)
            const walletMinted = parseInt(txn._hex, 16)
            setAlreadyMinted(walletMinted)
            console.log(walletMinted)
        }
    }

    const resetImages = () => {
        setimageLink1("../src/assets/questionmark1.png")
        setimageLink2("../src/assets/questionmark2.png")
        setimageLink3("../src/assets/questionmark3.png")
        setimageLink4("../src/assets/questionmark4.png")
    }

    const getNftsOwned = () => {
        if (currentAccount) {
            alchemy.nft
                .getNftsForOwner(currentAccount, {
                    contractAddresses: ["0x9e9b71520a0a67a0853c987ce14925f20b531d2f"],
                })
                .then((response) => {
                    setNftsOwned(response.ownedNfts)
                    console.log(response.ownedNfts[0].media[0].raw)
                    console.log(response.ownedNfts[0].tokenId)
                    console.log(response.ownedNfts[0])
                })
        }
    }

    //-------------------------------- TEST BUTTON --------------------------------------------------------------------
    const printValues = () => {
        getNftsOwned()
    }

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])
    useEffect(() => {
        getInitialData()
        getNftsOwned()
    }, [currentAccount])

    return (
        <div>
            {currentAccount === "" ? (
                <Button colorScheme="blue" onClick={connectWallet}>
                    Connect Wallet
                </Button>
            ) : !onGoerli ? (
                <div>You are not on the Goerli Testnet, please change the Network</div>
            ) : (
                <div>
                    <h1 className="h1">Let AI generate an NFT for you that you like</h1>

                    {maxMints > alreadyMinted && (
                        <div>
                            {!imagesGenerated ? (
                                <h2 className="h2">Make your choice for each attribute</h2>
                            ) : (
                                <h2 className="h2">Chose the image for your Nft</h2>
                            )}
                            {!imagesGenerated && (
                                <div className="attributesContainer">
                                    <div className="attributeContainer">
                                        <OptionDropdown
                                            optionsArray={options1}
                                            placeholder="Select an animal"
                                            id="option1"
                                        />
                                    </div>
                                    <div className="attributeContainer">
                                        <OptionDropdown
                                            optionsArray={options2}
                                            placeholder="Select an element"
                                            id="option2"
                                        />
                                    </div>
                                </div>
                            )}

                            {!imagesGenerated && (
                                <div className="error">
                                    {selectionNotOk &&
                                        "!! Choose an option for each of the attributes !!"}
                                </div>
                            )}

                            {!imagesGenerated && (
                                <div className="generateImageButton">
                                    <Button colorScheme="red" onClick={printValues}>
                                        Print values
                                    </Button>
                                    <Button colorScheme="blackAlpha" onClick={generateImage}>
                                        {gneratingImages ? (
                                            <div className="progressButton">
                                                <Spinner />{" "}
                                                <div className="textProgressButton">
                                                    Generating Images
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{`Generate Images (${alreadyMinted} / ${maxMints} Nfts already minted)`}</div>
                                        )}
                                    </Button>
                                </div>
                            )}

                            <div className="suggestionsContainer">
                                <div className="suggestionContainer">
                                    <img
                                        id="image1"
                                        onClick={() => setChosenImage(base64_1, "1")}
                                        className={chosenPicture === "1" ? "imageChosen" : "image"}
                                        src={imageLink1}
                                        alt={alt}
                                    />
                                </div>
                                <div className="suggestionContainer">
                                    <img
                                        onClick={() => setChosenImage(base64_2, "2")}
                                        className={chosenPicture == "2" ? "imageChosen" : "image"}
                                        src={imageLink2}
                                        alt={alt}
                                    />
                                </div>
                                <div className="suggestionContainer">
                                    <img
                                        onClick={() => setChosenImage(base64_3, "3")}
                                        className={chosenPicture == "3" ? "imageChosen" : "image"}
                                        src={imageLink3}
                                        alt={alt}
                                    />
                                </div>
                                <div className="suggestionContainer">
                                    <img
                                        onClick={() => setChosenImage(base64_4, "4")}
                                        className={chosenPicture == "4" ? "imageChosen" : "image"}
                                        src={imageLink4}
                                        alt={alt}
                                    />
                                </div>
                            </div>
                            {imagesGenerated && (
                                <div className="mintButton">
                                    <Button
                                        id="mintingButton"
                                        colorScheme="blackAlpha"
                                        onClick={() => mint()}
                                    >
                                        {mintingNft ? (
                                            <div className="progressButton">
                                                <Spinner />{" "}
                                                <div className="textProgressButton">
                                                    Minting in Progress
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                {`Mint Choice (${alreadyMinted} / ${maxMints} Nfts already minted)`}
                                            </div>
                                        )}
                                    </Button>
                                    <Button colorScheme="red" onClick={printValues}>
                                        Print values
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
            {alreadyMinted > 0 && (
                <div>
                    <div>Here are the NFTs you already minted and the link to the collection</div>

                    <a
                        href="https://testnets.opensea.io/collection/ainft-gmiamamfbl"
                        target="_blank"
                    >
                        <div className="ownedNfts">
                            {nftsOwned.map((nft) => {
                                return ownedNft(nft, baseURL)
                            })}
                        </div>
                        Go to the Collection
                    </a>
                </div>
            )}
        </div>
    )
}

export default App
