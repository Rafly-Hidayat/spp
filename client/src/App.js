import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./components/Pages/Login";
import LoginAdmin from "./components/Admin/LoginAdmin";
import LandingPage from "./components/LandingPage/LandingPage";
import SideBar from "./components/Sidebar/SideBar";

export default class App extends Component {
  render() {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/admin/login" component={LoginAdmin} />
            <Route path="/admin" component={SideBar} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
