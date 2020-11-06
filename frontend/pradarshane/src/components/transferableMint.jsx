import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ContractsContext } from "../context/contractsContext";
import { PortisContext } from "../context/web3PortisContext";
import axios from "axios";
import {
  Spinner,
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

const IpfsHttpClient = require("ipfs-http-client");
const ipfs = IpfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});
const TransferableTokenMintPage = () => {
  const { address } = useParams();
  const { getTransferableNFTContract } = useContext(ContractsContext);
  const { portis, web3 } = useContext(PortisContext);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [transferableContract, setTransferableContract] = useState();
  const [mintAddress, setMintAddress] = useState("");
  const [uniqueTokenName, setUniqueTokenName] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const [image, setImage] = useState();
  const [imageBuffer, setImageBuffer] = useState();

  useEffect(() => {
    const initialise = async () => {
      const _contract = await getTransferableNFTContract(address);
      console.log(_contract.methods);
      const _name = await _contract.methods.name().call();
      const _symbol = await _contract.methods.symbol().call();
      setTransferableContract(_contract);
      setName(_name);
      setSymbol(_symbol);
      console.log(_name, _symbol);
      setLoading(false);
    };
    initialise();
  }, []);
  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <div>
        <Container>
          <h2>
            <Row>Mint token</Row>
          </h2>
          <br />
          <h5>
            <Row>
              <Col>{name}</Col>
              <Col>{symbol}</Col>
              <Col>{address}</Col>
            </Row>
          </h5>
          <br />
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>User Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address to mint token to."
                onChange={(e) => {
                  setMintAddress(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Unique Token Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Give a unique token name"
                onChange={(e) => {
                  setUniqueTokenName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.File
                className="profile-image-input"
                label="Attach a unique token image"
                onChange={(event) => {
                  event.preventDefault();
                  setImage(URL.createObjectURL(event.target.files[0]));
                  const file = event.target.files[0];
                  const reader = new window.FileReader();
                  reader.readAsArrayBuffer(file);
                  reader.onloadend = () => {
                    setImageBuffer(Buffer(reader.result));
                  };
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={async () => {
                web3.eth.getAccounts(async (error, accounts) => {
                  const resposneImage = await ipfs.add(imageBuffer);
                  const ipfsImageHash = resposneImage.path;
                  console.log(ipfsImageHash);
                  console.log(mintAddress, uniqueTokenName);
                  console.log(accounts[0]);
                  const resp = await transferableContract.methods
                    .mintToken(mintAddress, uniqueTokenName, ipfsImageHash)
                    .send({ from: accounts[0] });
                });
                axios
                  .post("http://localhost:5000/addTransferableToken", {
                    address,
                    mintAddress,
                  })
                  .then((res) => {
                    console.log(res.data);
                  })
                  .catch((err) => console.error(err));
              }}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
};

export default TransferableTokenMintPage;
