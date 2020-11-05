import React, { Component, createContext } from "react";
import Portis from "@portis/web3";
import Web3 from "web3";
const portis = new Portis(
  "ef98df22-fb31-4d8e-94e0-f1fa9532e1e0",
  "maticMumbai"
);
const web3 = new Web3(portis.provider);

export const PortisContext = createContext();

const web3PortisContextProvider = (props) => {
  return (
    <PortisContext.Provider value={{ portis, web3 }}>
      {props.children}
    </PortisContext.Provider>
  );
};

export default web3PortisContextProvider;
