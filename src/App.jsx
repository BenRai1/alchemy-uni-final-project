import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import { Option } from "../components/Option"
// import ipfs from "./ipfs"

import "./App.css"
import { getWrappedNative } from "@web3uikit/web3"

const key = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({
    apiKey: key,
})
const openai = new OpenAIApi(configuration)

function App() {
    const [imageUrl1, setImageURL1] = useState(
        "https://i.seadn.io/gcs/files/4f82aecc2591d4f79e18cabb34c620b6.png?auto=format&w=1000"
    )
    const [imageUrl2, setImageURL2] = useState(
        "https://i.seadn.io/gcs/files/1089ca3f2fe5e9c4f32537077ee8feb0.png?auto=format&w=1000"
    )
    const [imageUrl3, setImageURL3] = useState(
        "https://i.seadn.io/gcs/files/45aefae563f35937711b6a95f70110e6.png?auto=format&w=1000"
    )
    const [imageUrl4, setImageURL4] = useState(
        "https://i.seadn.io/gcs/files/218f18093f45e60231106fb97221d63c.png?auto=format&w=1000"
    )
    const [chosenImageURL, setChosenImageUrl] = useState("")
    const [choicePicture, setChoicePicture] = useState("")
    let optionsArray = [
        { name: "small", clicked: false },
        { name: "red", clicked: false },
        { name: "hat", clicked: false },
        { name: "monocal", clicked: false },
        { name: "green eyes", clicked: false },
        { name: "confused", clicked: false },
    ]

    const alt =
        "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"

    const generateImage = async () => {
        let prompt = "A bird with"
        for (let i = 0; i < optionsArray.length; i++) {
            if (optionsArray[i].clicked == true) {
                prompt = prompt + " " + optionsArray[i].name
            }
        }

        const stringPrompt = prompt.toString()

        console.log(typeof stringPrompt)

        const response = await openai.createImage({
            prompt: stringPrompt,
            n: 4,
            size: "1024x1024",
            // response_format: "b64_json",
        })
        console.log(response)
        setImageURL1(response.data.data[0].url)
        setImageURL2(response.data.data[1].url)
        setImageURL3(response.data.data[2].url)
        setImageURL4(response.data.data[3].url)

        console.log(stringPrompt)
    }

    const setChosenImage = (chosenImageURL, imageId) => {
        setChosenImageUrl(chosenImageURL)
        console.log(chosenImageURL)
        setChoicePicture(imageId)
        console.log(choicePicture)
    }

    const mint = () => {
        const image = document.getElementById("image1")

        // Get the remote image as a Blob with the fetch API
        fetch(image.src)
            .then((res) => res.blob())
            .then((blob) => {
                // Read the Blob as DataURL using the FileReader API
                const reader = new FileReader()
                reader.onloadend = () => {
                    console.log(reader.result)
                    // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...

                    // Convert to Base64 string
                    const base64 = getBase64StringFromDataURL(reader.result)
                    console.log(base64)
                    // Logs wL2dvYWwgbW9yZ...
                }
                reader.readAsDataURL(blob)
            })
    }

    return (
        <div className="App">
            <h1>Final project</h1>
            <h2>Chose up to 4 attributes</h2>
            <div className="checkboxesContainer">
                {optionsArray.map((op, index) => {
                    return (
                        <div key={index} className="checkbox">
                            <Option name={op.name} index={index} optionsArray={optionsArray} />
                        </div>
                    )
                })}
            </div>
            <div className="card">
                <button onClick={generateImage}>Generate Image</button>
            </div>
            <div className="suggestionsContainer">
                <div className="suggestionContainer">
                    <img
                        id="image1"
                        className={choicePicture === "1" ? "imageChosen" : "img"}
                        src={imageUrl1}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl1, "1")}>Choose Nr.1</button>
                </div>
                <div className="suggestionContainer">
                    <img
                        className={choicePicture == "2" ? "imageChosen" : "img"}
                        src={imageUrl2}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl2, "2")}>Choose Nr.2</button>
                </div>
                <div className="suggestionContainer">
                    <img
                        className={choicePicture == "3" ? "imageChosen" : "img"}
                        src={imageUrl3}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl3, "3")}>Choose Nr.3</button>
                </div>
                <div className="suggestionContainer">
                    <img
                        className={choicePicture == "4" ? "imageChosen" : "img"}
                        src={imageUrl4}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl4, "4")}>Choose Nr.4</button>
                </div>
            </div>
            <button onClick={() => mint()}>Mint Choice</button>
        </div>
    )
}

export default App
