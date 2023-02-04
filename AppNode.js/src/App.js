import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { Option } from "./components/Option";
import { Buffer } from "buffer";
import base64Example from "./components/base64";
import ipfs from "./components/ipfs";
import createMetadata from "./components/CreatMetadata";
import AiNft from "./utils/AiNft.json";
import "./App.css";
import { ConnectWallet } from "@thirdweb-dev/react";
// import { ethers } from "ethers"

// import { ConnectWallet } from "@thirdweb-dev/react"
// import { connectToContract } from "./components/HelpingFunctions"

const openAIKey = process.env.VITE_OPENAI_API_KEY;
// const CONTRACT_ADDRESS_AINFT = "0x299bc06715DaBadb915085522daeFc5b8627539C"
// const aiNftContract = connectToContract(CONTRACT_ADDRESS_AINFT, AiNft.abi)

// https://ipfs.infura.io/ipfs/QmNkGQWQo7oxKUUpTvse9rEjzrjdWDAQMqzAmfRTGjSXCZ

//https://ipfs.infura-ipfs.io/ipfs/QmNkGQWQo7oxKUUpTvse9rEjzrjdWDAQMqzAmfRTGjSXCZ
// https://ipfs.infura.io:5001/api/v0/cat?arg=QmNkGQWQo7oxKUUpTvse9rEjzrjdWDAQMqzAmfRTGjSXCZ
// https://final-project-au.infura-ipfs.io/ipfs/QmbDLofw6tv5j5xMwJsY99x5UxFMMyKrrSrGm8CZVyBJYM

const configuration = new Configuration({
  apiKey: openAIKey,
});
const openai = new OpenAIApi(configuration);

function App() {
  const dedicatedGatewayInfuria = "final-project-au";

  // todo: State zusammenfassen und ein Array machen für links und Base64(??)

  const [imageLink1, setimageLink1] = useState(
    "https://i.seadn.io/gcs/files/45aefae563f35937711b6a95f70110e6.png?auto=format&w=1000"
  );
  const [imageLink2, setimageLink2] = useState(
    "https://i.seadn.io/gcs/files/1089ca3f2fe5e9c4f32537077ee8feb0.png?auto=format&w=1000"
  );
  const [imageLink3, setimageLink3] = useState(
    "https://i.seadn.io/gcs/files/45aefae563f35937711b6a95f70110e6.png?auto=format&w=1000"
  );
  const [imageLink4, setimageLink4] = useState(
    "https://i.seadn.io/gcs/files/218f18093f45e60231106fb97221d63c.png?auto=format&w=1000"
  );
  const [base64_1, setBase64_1] = useState("");
  const [base64_2, setBase64_2] = useState("");
  const [base64_3, setBase64_3] = useState("");
  const [base64_4, setBase64_4] = useState("");

  const [chosenBase64, setChosenBase64] = useState(base64Example);
  const [chosenPicture, setChosenPicture] = useState("");
  let optionsArray = [
    { name: "cat", clicked: false },
    { name: "dog", clicked: false },
    { name: "eagle", clicked: false },
    { name: "made out of fire", clicked: false },
    { name: "made out of wather", clicked: false },
    { name: "made out of lightining", clicked: false },
  ];

  const alt =
    "https://t3.ftcdn.net/jpg/01/91/95/30/360_F_191953033_gehQATeDoh5z6PyRDbeKyBZuS83CjMEF.jpg";

  const generateImage = async () => {
    let prompt = "A realistic photographic close up of a";
    for (let i = 0; i < optionsArray.length; i++) {
      if (optionsArray[i].clicked == true) {
        prompt = prompt + " " + optionsArray[i].name;
      }
    }

    const stringPrompt = prompt.toString();

    console.log(typeof stringPrompt);

    const response = await openai.createImage({
      prompt: stringPrompt,
      n: 4,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(response);

    setimageLink1("data:image/png;base64," + response.data.data[0].b64_json);
    setimageLink2("data:image/png;base64," + response.data.data[1].b64_json);
    setimageLink3("data:image/png;base64," + response.data.data[2].b64_json);
    setimageLink4("data:image/png;base64," + response.data.data[3].b64_json);

    setBase64_1(response.data.data[0].b64_json);
    setBase64_2(response.data.data[1].b64_json);
    setBase64_3(response.data.data[2].b64_json);
    setBase64_4(response.data.data[3].b64_json);

    console.log(stringPrompt);
  };

  const setChosenImage = (chosenBase64, imageId) => {
    setChosenBase64(chosenBase64);
    setChosenPicture(imageId);
    console.log(chosenPicture);
  };

  const mint = async () => {
    // transforme the base64 data to data readable for to ipfs api
    let imageLink;
    const buffer = Buffer.from(chosenBase64, "base64");

    ipfs.add(buffer).then((result) => {
      imageLink = `https://${dedicatedGatewayInfuria}.infura-ipfs.io/ipfs/${result.path}`;
      // imageLink = "https://final-project-au.infura-ipfs.io/ipfs/QmRuiAezX2vuGTG5mRbYwkxUFY5kHk2NYewFUNs1B6mWVG"
      console.log("image Link :", imageLink);
      const metadata = createMetadata(imageLink, 1);
      ipfs.add(metadata).then((result) => {
        const linkToMetatdata = `https://${dedicatedGatewayInfuria}.infura-ipfs.io/ipfs/${result.path}`;
        console.log("Link to metadata: ", linkToMetatdata);
      });
    });

    // console.log(`https://${dedicatedGatewayInfuria}.infura-ipfs.io/ipfs/${metadataCid}`)
  };

  return (
    <div className="App">
      <ConnectWallet accentColor="#f213a4" colorMode="dark" />
      <h1>Final project</h1>
      <h2>Chose up to 4 attributes</h2>
      <div className="checkboxesContainer">
        {optionsArray.map((op, index) => {
          return (
            <div key={index} className="checkbox">
              <Option
                name={op.name}
                index={index}
                optionsArray={optionsArray}
              />
            </div>
          );
        })}
      </div>
      <div className="card">
        <button onClick={generateImage}>Generate Image</button>
      </div>
      <div className="suggestionsContainer">
        <div className="suggestionContainer">
          <img
            id="image1"
            className={chosenPicture === "1" ? "imageChosen" : "img"}
            src={imageLink1}
            alt={alt}
          />
          <button onClick={() => setChosenImage(base64_1, "1")}>
            Choose Nr.1
          </button>
        </div>
        <div className="suggestionContainer">
          <img
            className={chosenPicture == "2" ? "imageChosen" : "img"}
            src={imageLink2}
            alt={alt}
          />
          <button onClick={() => setChosenImage(base64_2, "2")}>
            Choose Nr.2
          </button>
        </div>
        <div className="suggestionContainer">
          <img
            className={chosenPicture == "3" ? "imageChosen" : "img"}
            src={imageLink3}
            alt={alt}
          />
          <button onClick={() => setChosenImage(base64_3, "3")}>
            Choose Nr.3
          </button>
        </div>
        <div className="suggestionContainer">
          <img
            className={chosenPicture == "4" ? "imageChosen" : "img"}
            src={imageLink4}
            alt={alt}
          />
          <button onClick={() => setChosenImage(base64_4, "4")}>
            Choose Nr.4
          </button>
        </div>
      </div>
      <button onClick={() => mint()}>Mint Choice</button>
    </div>
  );
}

export default App;
