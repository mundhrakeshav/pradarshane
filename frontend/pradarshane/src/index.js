import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import Web3PortisContextProvider from "./context/web3PortisContext";
import ContractsContextProvider from "./context/contractsContext";

ReactDOM.render(
  <Web3PortisContextProvider>
    <ContractsContextProvider>
      <App />
    </ContractsContextProvider>
  </Web3PortisContextProvider>,
  document.getElementById("root")
);
