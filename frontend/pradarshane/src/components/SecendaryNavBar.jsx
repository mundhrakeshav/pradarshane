import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PortisContext } from "../context/web3PortisContext";

function SecendaryNavBar() {
  const { web3, portis } = useContext(PortisContext);
  const [address, setAddress] = useState(0x000);

  return (
    <Navbar bg="transparent" variant="light">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/createTokenPage">
            <Button variant="dark">Create Token</Button>
          </Link>
        </Nav>

        <Nav className="ml-auto">
          <Link to="/marketPlace">
            <Button variant="secondary" size="sm">
              Market Place
            </Button>
          </Link>
          <Nav.Link href="#">Sell</Nav.Link>
          <Nav.Link href="#">Explore</Nav.Link>
          <Link to="/profilePage">
            <Button variant="secondary" size="sm">
              Your Contracts
            </Button>{" "}
          </Link>
          <Link to="/tokens">
            <Button variant="dark" size="sm">
              Your Tokens
            </Button>{" "}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SecendaryNavBar;
