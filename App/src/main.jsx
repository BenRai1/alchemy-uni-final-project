import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
// import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
// const activeChainId = ChainId.Goerli

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* <ThirdwebProvider desiredChainId={activeChainId}> */}
        <App />
        {/* </ThirdwebProvider> */}
    </React.StrictMode>
)
