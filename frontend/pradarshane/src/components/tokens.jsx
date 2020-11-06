import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Container, Row, Col, Button } from "react-bootstrap";
import { PortisContext } from "../context/web3PortisContext";
import { ContractsContext } from "../context/contractsContext";

const TokensPage = () => {
  const { web3 } = useContext(PortisContext);
  const {
    getNonTransferableNFTContract,
    getTransferableNFTContract,
    getTransferableOwnableNFTContract,
    getNFTFactoryContract,
  } = useContext(ContractsContext);

  const [isLoading, setLoading] = useState(true);

  const [transferableContracts, setTransferableContracts] = useState([]);
  const [nonTransferableContracts, setNonTransferableContracts] = useState([]);
  const [
    transferableOwnableContracts,
    setTransferableOwnableContracts,
  ] = useState([]);

  useEffect(() => {
    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
      const account = accounts[0];
      axios
        .post("http://localhost:5000/getTransferableTokens", {
          account,
        })
        .then((res) => {
          console.log(res.data);
          setTransferableContracts(res.data);
        })
        .catch((err) => console.error(err));

      axios
        .post("http://localhost:5000/getTransferableOwnableContracts", {
          account,
        })
        .then((res) => {
          console.log(res.data);
          setTransferableOwnableContracts(res.data);
        })
        .catch((err) => console.error(err));
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    const transferableFragment = transferableContracts.map(
      (contractAddress) => {
        console.log(contractAddress);
        return (
          <div>
            <br />
            <TransferableTokensFragment address={contractAddress} />
          </div>
        );
      }
    );

    const transferableOwnableFragment = transferableOwnableContracts.map(
      (contractAddress) => {
        console.log(contractAddress);
        return (
          <div>
            <br />
            <TransferableOwnableContracts address={contractAddress} />
          </div>
        );
      }
    );
    return (
      <div>
        <h4>Transferable Tokens</h4>
        {transferableFragment}
        <br />
        <h4>Transferable Ownable Tokens</h4>
        {transferableOwnableFragment}
        <br />
        <h4>Non Transferable Tokens</h4>
      </div>
    );
  }
};

export default TokensPage;

const NonTransferableTokenFragments = () => {
  return <div>NonTransferableTokenFragments</div>;
};

const TransferableOwnableContracts = (props) => {
  const address = props.address;
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const { web3 } = useContext(PortisContext);
  const [symbol, setSymbol] = useState("");
  const { getTransferableOwnableNFTContract } = useContext(ContractsContext);
  const [tokensByIndex, setTokensByIndex] = useState([]);
  const [ipfsHash, setIpfsHash] = useState([]);
  const [uniqueName, setuniqueName] = useState([]);

  useEffect(async () => {
    web3.eth.getAccounts(async (error, accounts) => {
      console.log(accounts);
      const account = accounts[0];
      setAccount(account);
      const transferableOwnableContract = await getTransferableOwnableNFTContract(
        address
      );
      const _name = await transferableOwnableContract.methods.name().call();
      const _symbol = await transferableOwnableContract.methods.symbol().call();
      const _balance = await transferableOwnableContract.methods
        .balanceOf(account)
        .call();
      for (let index = 1; index <= _balance; index++) {
        const tokenCount = await transferableOwnableContract.methods
          .tokenOfOwnerByIndex(account, index)
          .call();
        tokensByIndex.push(tokenCount);
        setTokensByIndex(tokensByIndex);
      }

      console.log(_balance);
      setName(_name);
      setSymbol(_symbol);

      tokensByIndex.forEach(async (tokenId) => {
        const tokenData = await transferableOwnableContract.methods
          .tokenData(tokenId)
          .call();

        setuniqueName(tokenData[0]);
        setIpfsHash(tokenData[1]);
      });
    });
  }, []);

  return (
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
            <Button
              variant="dark"
              onClick={() => {
                axios
                  .post("http://localhost:5000/addToMarketPlace", {
                    userAddress: account,
                    contractAddress: address,
                    tokenType: 2,
                  })
                  .then((res) => {})
                  .catch((err) => console.error(err));
              }}>
              Sell
            </Button>{" "}
          </Row>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};

const TransferableTokensFragment = (props) => {
  const address = props.address;
  const [name, setName] = useState("");

  const [account, setAccount] = useState("");
  const { web3 } = useContext(PortisContext);
  const [symbol, setSymbol] = useState("");
  const { getTransferableNFTContract } = useContext(ContractsContext);
  const [tokensByIndex, setTokensByIndex] = useState([]);
  const [ipfsHash, setIpfsHash] = useState([]);
  const [uniqueName, setuniqueName] = useState([]);

  useEffect(async () => {
    web3.eth.getAccounts(async (error, accounts) => {
      console.log(accounts);
      const account = accounts[0];
      setAccount(account);
      const transferableContract = await getTransferableNFTContract(address);
      const _name = await transferableContract.methods.name().call();
      const _symbol = await transferableContract.methods.symbol().call();
      const _balance = await transferableContract.methods
        .balanceOf(account)
        .call();
      for (let index = 1; index <= _balance; index++) {
        const tokenCount = await transferableContract.methods
          .tokenOfOwnerByIndex(account, index)
          .call();
        tokensByIndex.push(tokenCount);
        setTokensByIndex(tokensByIndex);
      }

      console.log(_balance);
      setName(_name);
      setSymbol(_symbol);

      tokensByIndex.forEach(async (tokenId) => {
        const tokenData = await transferableContract.methods
          .tokenData(tokenId)
          .call();

        setuniqueName(tokenData[0]);
        setIpfsHash(tokenData[1]);
      });
    });
  }, []);

  return (
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
            <Button
              variant="dark"
              onClick={() => {
                axios
                  .post("http://localhost:5000/addToMarketPlace", {
                    userAddress: account,
                    contractAddress: address,
                    tokenType: 1,
                  })
                  .then((res) => {})
                  .catch((err) => console.error(err));
              }}>
              Sell
            </Button>{" "}
          </Row>
        </Col>
      </Row>
      <hr />
    </Container>
  );
};
