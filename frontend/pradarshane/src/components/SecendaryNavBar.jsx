import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { PortisContext } from "../context/web3PortisContext";

function SecendaryNavBar() {
  const { web3, portis } = useContext(PortisContext);
  const [address, setAddress] = useState(0x000);

  return (
    <Navbar bg="transparent" variant="light">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#">Create Token</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link>Market Place</Nav.Link>
          <Nav.Link href="#">Sell</Nav.Link>
          <Nav.Link href="#">Explore</Nav.Link>
          <Nav.Link href="#">Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default SecendaryNavBar;
