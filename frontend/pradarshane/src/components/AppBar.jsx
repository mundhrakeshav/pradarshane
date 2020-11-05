import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { PortisContext } from "../context/web3PortisContext";

function AppBar() {
  const { web3, portis } = useContext(PortisContext);
  const [address, setAddress] = useState(0x000);
  useEffect(() => {
    web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);

      setAddress(accounts[0]);
    });
  }, []);
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">प्रदर्शनी</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            onClick={() => {
              portis.showPortis();
            }}>
            Show Wallet
          </Nav.Link>
          <Nav.Link href="#">{address}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppBar;
