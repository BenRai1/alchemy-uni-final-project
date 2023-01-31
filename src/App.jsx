import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"

import "./App.css"

const key = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({
    apiKey: key,
})
const openai = new OpenAIApi(configuration)

function App() {
    const [imageUrl, setImageURL] = useState("")

    const generateImage = async () => {
        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     prompt: "Say this is a test",
        //     temperature: 0,
        //     max_tokens: 2,
        // })
        // console.log(response)

        const response = await openai.createImage({
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
        })
        console.log(response)
        setImageURL(response.data.data[0].url)
    }

    return (
        <div className="App">
            <h1>Final project</h1>
            <div className="card">
                <button onClick={generateImage}>Generate Image</button>
            </div>
            <img src={imageUrl} alt="no Image" />
        </div>
    )
}

export default App
