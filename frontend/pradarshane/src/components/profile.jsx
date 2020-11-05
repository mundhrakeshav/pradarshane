import React, { useState, useContext, useEffect } from "react";
import { Row, Container, Col, Badge, Button, Spinner } from "react-bootstrap";
import { ContractsContext } from "../context/contractsContext";
import { PortisContext } from "../context/web3PortisContext";
import "./profilePage.css";
const ProfilePage = () => {
  const numbers = [1, 2, 3, 4, 5];

  const [isLoading, setLoading] = useState(true);
  const [transferableContracts, setTransferableContracts] = useState([]);
  const [
    transferableOwnableContracts,
    setTransferableOwnableContracts,
  ] = useState([]);
  const [nonTransferableContracts, setNonTransferableContracts] = useState([]);
  const { getNFTFactoryContract } = useContext(ContractsContext);
  const { web3, portis } = useContext(PortisContext);

  useEffect(async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const nftFactoryContract = await getNFTFactoryContract();

    const _transferableContracts = await nftFactoryContract.methods
      .getTransferableNFTContracts(accounts[0])
      .call();
    setTransferableContracts(transferableContracts);

    const _nonTransferableContracts = await nftFactoryContract.methods
      .getNonTransferableNFTContracts(accounts[0])
      .call();

    const _transferableOwnableContracts = await nftFactoryContract.methods
      .getTransferableOwnableNFTContracts(accounts[0])
      .call();

    setTransferableContracts(_transferableContracts);
    setNonTransferableContracts(_nonTransferableContracts);
    setTransferableOwnableContracts(_transferableOwnableContracts);
    setLoading(false);
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    const transferableContractsList = transferableContracts.map(
      (contractAddress) => (
        <TransferableTokenListItem address={contractAddress} />
      )
    );

    const transferableOwnableContractsList = transferableOwnableContracts.map(
      (contractAddress) => (
        <TransferableOwnableTokenListItem address={contractAddress} />
      )
    );

    const nonTransferableContractsList = nonTransferableContracts.map(
      (contractAddress) => (
        <NonTransferableTokenListItem address={contractAddress} />
      )
    );

    return (
      <div className="profile-page">
        <h2>
          <Badge variant="secondary">Your Contracts</Badge> <br />
        </h2>{" "}
        <br />
        <h5>
          <Badge variant="secondary">Transferable</Badge> <br />
        </h5>
        <Container fluid>{transferableContractsList}</Container>
        <br />
        <h5>
          <Badge variant="secondary">Transferable Ownable</Badge> <br />
        </h5>
        <Container fluid>{transferableOwnableContractsList}</Container>
        <br />
        <h5>
          <Badge variant="secondary">Non Transferable</Badge> <br />
        </h5>
        <Container fluid>{nonTransferableContractsList}</Container>
      </div>
    );
  }
};

export default ProfilePage;

const TransferableTokenListItem = (props) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const { getTransferableNFTContract } = useContext(ContractsContext);
  useEffect(async () => {
    const _transferableContract = await getTransferableNFTContract(
      props.address
    );
    const _name = await _transferableContract.methods.name().call();
    const _symbol = await _transferableContract.methods.symbol().call();
    console.log(_name, _symbol);
    setTokenName(_name);
    setTokenSymbol(_symbol);
  }, []);
  return (
    <>
      <Row>
        <Col>{tokenSymbol}</Col>
        <Col>{tokenName}</Col>
        <Col>{props.address}</Col>
        <Button onClick={() => {}}>View</Button>
      </Row>
      <br />
    </>
  );
};

const TransferableOwnableTokenListItem = (props) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const { getTransferableOwnableNFTContract } = useContext(ContractsContext);
  useEffect(async () => {
    const _transferableOwnableContract = await getTransferableOwnableNFTContract(
      props.address
    );
    const _name = await _transferableOwnableContract.methods.name().call();
    const _symbol = await _transferableOwnableContract.methods.symbol().call();
    console.log(_name, _symbol);
    setTokenName(_name);
    setTokenSymbol(_symbol);
  }, []);
  return (
    <>
      <Row>
        <Col>{tokenSymbol}</Col>
        <Col>{tokenName}</Col>
        <Col>{props.address}</Col>
        <Button onClick={() => {}}>View</Button>
      </Row>
      <br />
    </>
  );
};

const NonTransferableTokenListItem = (props) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const { getNonTransferableNFTContract } = useContext(ContractsContext);
  useEffect(async () => {
    const _nonTransferableNFTContract = await getNonTransferableNFTContract(
      props.address
    );
    const _name = await _nonTransferableNFTContract.methods.name().call();
    const _symbol = await _nonTransferableNFTContract.methods.symbol().call();
    console.log(_name, _symbol);
    setTokenName(_name);
    setTokenSymbol(_symbol);
  }, []);
  return (
    <>
      <Row>
        <Col>{tokenSymbol}</Col>
        <Col>{tokenName}</Col>
        <Col>{props.address}</Col>
        <Button onClick={() => {}}>View</Button>
      </Row>
      <br />
    </>
  );
};
