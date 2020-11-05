import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import SecendaryNavBar from "./components/SecendaryNavBar";
import AppBar from "./components/AppBar";
import CreateTokenPage from "./components/createToken";

function App() {
  return (
    <div className="App">
      <AppBar />
      <SecendaryNavBar />
      <CreateTokenPage />
    </div>
  );
}

export default App;
