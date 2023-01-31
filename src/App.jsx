import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"

import "./App.css"

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
    const [choice, setChoice] = useState("")

    const alt =
        "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg"

    const generateImage = async () => {
        // const response = await openai.createImage({
        //     prompt: "a white siamese cat",
        //     n: 1,
        //     size: "1024x1024",
        // })
        // console.log(response)
        // setImageURL(response.data.data[0].url)

        console.log(promt)
    }

    const setChosenImage = (chosenImageURL, imageId) => {
        setChosenImageUrl(chosenImageURL)
        console.log(chosenImageURL)
        setChoice(imageId)
        console.log(choice)
    }

    return (
        <div className="App">
            <h1>Final project</h1>
            <div className="card">
                <button onClick={generateImage}>Generate Image</button>
            </div>
            <div className="suggestionsContainer">
                <div className="suggestionContainer">
                    <img
                        className={choice === "1" ? "imageChosen" : "img"}
                        src={imageUrl1}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl1, "1")}>Choose Nr.1</button>
                </div>
                <div className="suggestionContainer">
                    <img
                        className={choice == "2" ? "imageChosen" : "img"}
                        src={imageUrl2}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl2, "2")}>Choose Nr.2</button>
                </div>
                <div className="suggestionContainer">
                    <img
                        className={choice == "3" ? "imageChosen" : "img"}
                        src={imageUrl3}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl3, "3")}>Choose Nr.3</button>
                </div>
                <div className="suggestionContainer">
                    <img
                        className={choice == "4" ? "imageChosen" : "img"}
                        src={imageUrl4}
                        alt={alt}
                    />
                    <button onClick={() => setChosenImage(imageUrl4, "4")}>Choose Nr.4</button>
                </div>
            </div>
        </div>
    )
}

export default App
