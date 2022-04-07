import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginAdmin from "./components/Admin/LoginAdmin";
import LandingPage from "./components/LandingPage/LandingPage";
import SideBar from "./components/Sidebar/SideBar";
import Login from './user/LoginPage/Login'
import SidebarUser from './user/SideBarUser/SideBarUser'
import NotFound from './components/Pages/NotFound';

export default class App extends Component {
  render() {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/admin/login" component={LoginAdmin} />
            <Route path="/admin" component={SideBar} />
            <Route path="/user/login" component={Login} />
            <Route path="/user" component={SidebarUser} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
