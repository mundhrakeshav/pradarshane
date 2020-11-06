import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SecendaryNavBar from "./components/SecendaryNavBar";
import AppBar from "./components/AppBar";
import CreateTokenPage from "./components/createToken";
import ProfilePage from "./components/profile";
import TokensPage from "./components/tokens";
import TransferableTokenMintPage from "./components/transferableMint";
import NonTransferableTokenMintPage from "./components/nonTransferableMint";
import TransferableOwnableTokenMintPage from "./components/transferableOwnableMint";
import MarketPlace from "./components/marketPlace";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar />
        <SecendaryNavBar />
        <Switch>
          <Route path="/createTokenPage" component={CreateTokenPage} exact />
          <Route path="/profilePage" component={ProfilePage} exact />
          <Route path="/tokens" component={TokensPage} exact />
          <Route
            path="/transferableTokenMint/:address"
            component={TransferableTokenMintPage}
            exact
          />
          <Route
            path="/nonTransferableTokenMint/:address"
            component={NonTransferableTokenMintPage}
            exact
          />
          <Route
            path="/transferableOwnableTokenMint/:address"
            component={TransferableOwnableTokenMintPage}
            exact
          />
          <Route path="/marketPlace" component={MarketPlace} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
