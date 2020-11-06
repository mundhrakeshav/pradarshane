import React, { useEffect, useState, useContext } from "react";
import { PortisContext } from "../context/web3PortisContext";
import { ContractsContext } from "../context/contractsContext";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";

import axios from "axios";
const MarketPlace = () => {
  const [items, setItems] = useState([]);
  const { web3 } = useContext(PortisContext);
  const {
    getNonTransferableNFTContract,
    getTransferableNFTContract,
    getTransferableOwnableNFTContract,
    getNFTFactoryContract,
  } = useContext(ContractsContext);

  useEffect(() => {
    let data = [];
    axios
      .get("http://localhost:5000/getMarketPlace")
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const marketPlaceList = items.map((item) => {
    return (
      <MarketPlaceItem
        contractAddress={item.contractAddress}
        tokenType={item.tokenType}
        userAddress={item.userAddress}
      />
    );
  });

  return <div>{marketPlaceList} </div>;
};

export default MarketPlace;

const MarketPlaceItem = (props) => {
  const { web3 } = useContext(PortisContext);
  const {
    getTransferableNFTContract,
    getTransferableOwnableNFTContract,
  } = useContext(ContractsContext);

  const [contract, setContract] = useState();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [uniqueName, setUniqueName] = useState();
  const [ipfsHash, setIpfsHash] = useState();

  let _contract;
  useEffect(async () => {
    if (props.tokenType === 1) {
      _contract = await getTransferableNFTContract(props.contractAddress);
    } else {
      _contract = await getTransferableOwnableNFTContract(
        props.contractAddress
      );
    }
    setContract(_contract);

    const _name = await _contract.methods.name().call();
    setName(_name);
    const _symbol = await _contract.methods.symbol().call();
    setSymbol(_symbol);
    const _tokenData = await _contract.methods.tokenData(1).call();
    setUniqueName(_tokenData[0]);
    setIpfsHash(_tokenData[1]);
    console.log(_tokenData, "toke");
  }, []);

  return (
    <div>
      {" "}
      <Container>
        <Row>
          <Col>
            <img
              src={`http://ipfs.io/ipfs/${ipfsHash}`}
              alt=""
              srcset=""
              width="40%%"
            />
          </Col>{" "}
          <Col xs={8}>
            <Row>
              <Col>{uniqueName}</Col>
              <Col>{name}</Col>
              <Col>{symbol}</Col>
            </Row>
            <Row> </Row>
            <Row>
              <Button variant="dark">Buy</Button>{" "}
            </Row>
          </Col>
        </Row>
        <hr />
      </Container>
    </div>
  );
};
