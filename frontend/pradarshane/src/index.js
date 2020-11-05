import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import Web3PortisContext from "./context/web3PortisContext";

ReactDOM.render(
  <Web3PortisContext>
    <App />
  </Web3PortisContext>,
  document.getElementById("root")
);
