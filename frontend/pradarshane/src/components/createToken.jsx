import React, { useState } from "react";
import { Form, Button, Dropdown } from "react-bootstrap";
import "./createToken.css";
const CreateTokenPage = () => {
  const [formType, setFormType] = useState(1);
  return (
    <div className="create-token-form">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Token Name</Form.Label>
          <Form.Control type="text" placeholder="Name of token" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Symbol</Form.Label>
          <Form.Control type="text" placeholder="Symbol of token" />
        </Form.Group>
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
          onClick={(e) => {
            e.preventDefault();
            console.log(formType);
          }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CreateTokenPage;
