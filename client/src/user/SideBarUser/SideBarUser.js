import React, { useState } from "react";
import ProtectedRoute from "../../ProtectedRoute";
import { useHistory } from "react-router";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
  Button,
  Image, Offcanvas
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faHome,
  faBell,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from "../Assets/LandingPageImg/Logo.png";

import "./SideBarUser.css";

import navlogo from "../Assets/logotextwhite.svg";
import Dashboard from "../DashboardUser/DashboardUser";
import Transaksi from "../Transaksi/Transaksi";
import Logout from "../Logout/Logout";
import PembayaranBebas from "../PembayaranBebas/PembayaranBebas";
import ProfileSiswa from "./../Profile/ProfileSiswa";
import Profile from "./../Profile/Profile";
import UbahProfileSiswa from "../Profile/UbahProfileSiswa";
import Invoice from "../PembayaranBulanan/Invoice";
import InvoiceBebas from "./../PembayaranBebas/InvoiceBebas";

const SideBar = () => {
  const [sidebar, setSidebar] = useState("sidebar");
  const [main, setMain] = useState("main");
  const [text, setText] = useState("block");
  const [button, setbutton] = useState("button");

  const [mode, setMode] = useState(1);

  const changeSidebar = () => {
    if (mode == 0) {
      setSidebar("sidebar1");
      setMain("main1");
      setbutton("button1");
      setText("none");
      setMode(1);
    } else {
      setSidebar("sidebar");
      setMain("main");
      setbutton("button");
      setText("block");
      setMode(0);
    }
  };
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("dataSiswa");
    history.push("/");
  };

  const user = JSON.parse(localStorage.getItem("dataSiswa"));
  console.log(user);

  return (
    <div>
      <div className="user">
        {/* Navbar */}

        <Navbar bg="light" expand={false} className="navbar" fixed="top">
          <Container >
            <Navbar.Brand style={{
              color: 'white',
              border: '5px',
            }}>
              <Image onClick={changeSidebar} className="logo" src={logo} />{" "}
              SPS
            </Navbar.Brand>
            <Navbar.Text className="text justify-content-end">
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
              }}>Hi, Fajar</span>
            </Navbar.Text>
            <Navbar.Toggle className="burger" aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">

                  Hi, Fajar
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/user">Home</Nav.Link>
                  <Nav.Link href="/user/transaksi">Transaksi</Nav.Link>
                  <Nav.Link href="/user/profile">Profile</Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>

      {/* Sidebar */}

      <div className={sidebar}>
        <br />

        <Link to="/user">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faHome} />
            </center>
            <p style={{ display: text }}>Home</p>
          </span>
        </Link>

        <br />
        <Link to="/user/transaksi">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faCreditCard} />
            </center>
            <p style={{ display: text }}>Transaksi</p>
          </span>
        </Link>

        <br />
        <Link to="/user/profile">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faUser} />
            </center>
            <p style={{ display: text }}>Profile</p>
          </span>
        </Link>

        <br />
        <span className="menu" onClick={handleLogout}>
          <center className="logo">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </center>
          <p style={{ display: text }}>Log out</p>
        </span>
      </div>

      <div className={main}>
        <Route exact path="/user/" component={Dashboard} />
        <Route
          exact
          path="/user/pembayaran/bebas/:id"
          component={PembayaranBebas}
        />

        <Route exact path="/user/transaksi" component={Transaksi} />
        <Route exact path="/user/profile" component={ProfileSiswa} />
        <Route exact path="/user/profile/ubah/" component={UbahProfileSiswa} />

        {/* <ProtectedRoute exact path="/user/profile" component={Profile} /> */}

        <ProtectedRoute
          exact
          path="/user/invoice/bulanan/:id"
          component={Invoice}
        />
        <ProtectedRoute
          exact
          path="/user/invoice/bebas/:id"
          component={InvoiceBebas}
        />

        <ProtectedRoute exact path="/logout" component={Logout} />
      </div>
      <br />
    </div>
  );
};

export default SideBar;
