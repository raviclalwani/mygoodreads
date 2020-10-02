import React from "react";
import ReactDOM from "react-dom";
import Autocomplete from "./Autocomplete";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>My Good Reads</h1>
      <Autocomplete />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
