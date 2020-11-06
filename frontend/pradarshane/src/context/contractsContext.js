import React, { Component, createContext } from "react";
import Portis from "@portis/web3";
import Web3 from "web3";
import nftFactoryAbi from "../abis/NFTFactory.json";
import transferableContractAbi from "../abis/ERC721Transferable.json";
import nonTransferableContractAbi from "../abis/ERC721NonTransferable.json";
import transferableOwnableContractAbi from "../abis/ERC721TransferableOwnable.json";
const portis = new Portis(
  "ef98df22-fb31-4d8e-94e0-f1fa9532e1e0",
  "maticMumbai"
);
const web3 = new Web3(portis.provider);

export const ContractsContext = createContext();

const ContractsContextProvider = (props) => {
  const getNonTransferableNFTContract = (address) => {
    const nonTransferableContract = new web3.eth.Contract(
      nonTransferableContractAbi,
      address
    );
    nonTransferableContract.setProvider(portis.provider);
    return nonTransferableContract;
  };

  const getTransferableNFTContract = (address) => {
    const transferableContract = new web3.eth.Contract(
      transferableContractAbi,
      address
    );
    transferableContract.setProvider(portis.provider);
    return transferableContract;
  };

  const getTransferableOwnableNFTContract = (address) => {
    const transferableOwnableContract = new web3.eth.Contract(
      transferableOwnableContractAbi,
      address
    );

    transferableOwnableContract.setProvider(portis.provider);

    return transferableOwnableContract;
  };

  const getNFTFactoryContract = async () => {
    const nftContract = new web3.eth.Contract(
      nftFactoryAbi,
      "0x33c17133655F6bBA4393B41827A1b97D7386c372"
    );
    nftContract.setProvider(portis.provider);
    // console.log(newContract.methods);
    return nftContract;
  };

  return (
    <ContractsContext.Provider
      value={{
        getNonTransferableNFTContract,
        getTransferableNFTContract,
        getTransferableOwnableNFTContract,
        getNFTFactoryContract,
      }}>
      {props.children}
    </ContractsContext.Provider>
  );
};

export default ContractsContextProvider;
