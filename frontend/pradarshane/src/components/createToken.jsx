import React, { useState, useContext } from "react";
import { Form, Button, Dropdown, FormFile } from "react-bootstrap";
import { ContractsContext } from "../context/contractsContext";
import { PortisContext } from "../context/web3PortisContext";
import "./createToken.css";
const CreateTokenPage = () => {
  const [formType, setFormType] = useState(1);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const { getNFTFactoryContract } = useContext(ContractsContext);
  const { web3 } = useContext(PortisContext);

  return (
    <div className="create-token-form">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Token Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name of token"
            onChange={(e) => {
              setTokenName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Symbol</Form.Label>
          <Form.Control
            type="text"
            placeholder="Symbol of token"
            onChange={(e) => {
              setTokenSymbol(e.target.value);
            }}
          />
        </Form.Group>
        <br />
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Type of token{" "}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              onSelect={() => {
                setFormType(1);
              }}>
              Transferable
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-2"
              onSelect={() => {
                setFormType(2);
              }}>
              Transferable Ownable
            </Dropdown.Item>
            <Dropdown.Item
              href="#/action-3"
              onSelect={() => {
                setFormType(3);
              }}>
              Non Transferable
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br />
        <Button
          variant="dark"
          type="submit"
          onClick={async (e) => {
            e.preventDefault();
            const nftContract = await getNFTFactoryContract();
            console.log(nftContract);
            let tx;
            web3.eth.getAccounts((error, accounts) => {
              const account = accounts[0];
              console.log(account);
              if (formType === 1) {
                tx = nftContract.methods.createTransferableNFT(
                  tokenName,
                  tokenSymbol
                );
              } else if (formType === 2) {
                tx = nftContract.methods.createTransferableOwnableNFT(
                  tokenName,
                  tokenSymbol
                );
              } else {
                tx = nftContract.methods.createNonTransferableNFT(
                  tokenName,
                  tokenSymbol
                );
              }
              tx.send({ from: account }).then((txhash, e) => {
                console.log(txhash, e);
              });
            });
          }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateTokenPage;
