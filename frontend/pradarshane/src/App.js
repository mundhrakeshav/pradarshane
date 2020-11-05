import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SecendaryNavBar from "./components/SecendaryNavBar";
import AppBar from "./components/AppBar";
import CreateTokenPage from "./components/createToken";
import ProfilePage from "./components/profile";

function App() {
  return (
    <div className="App">
      <Router>
        <AppBar />
        <SecendaryNavBar />
        <Switch>
          <Route path="/createTokenPage" component={CreateTokenPage} exact />
          <Route path="/profilePage" component={ProfilePage} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
