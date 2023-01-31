import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Final project</h1>
      <div className="card">
        <button>Generate Image</button>
      </div>
    </div>
  );
}

export default App;
