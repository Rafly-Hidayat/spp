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
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../Assets/LandingPageImg/Logo.png";

import "./SideBarUser.css";

import Dashboard from "../DashboardUser/DashboardUser";
import Transaksi from "../Transaksi/Transaksi";
import Logout from "../Logout/Logout";
import PembayaranBebas from "../PembayaranBebas/PembayaranBebas";
import ProfileSiswa from "./../Profile/ProfileSiswa";
import UbahProfileSiswa from "../Profile/UbahProfileSiswa";
import Invoice from "../PembayaranBulanan/Invoice";
import InvoiceBebas from "./../PembayaranBebas/InvoiceBebas";

import QRCode from "react-qr-code";
import Qr from "../Assets/QrCode.svg";

const SideBar = () => {
  const [sidebar, setSidebar] = useState("sidebar");
  const [main, setMain] = useState("main");
  const [text, setText] = useState("block");
  const [button, setbutton] = useState("button");
  
  const [qr, setqr] = useState("none");


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
  
  const changeQr = () => {
    if (mode == 0) {
      setqr("block");
      setMode(1);
    } else {
      setqr("none");
      setMode(0);
    }
  };


  const history = useHistory();
  const handleLogout = () => {
    Swal.fire({
      // title: "Apakah anda yakin, ingin keluar?",
      text:"Apakah anda yakin, ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, keluar!",
    }).then((result) => {
      if (result.isConfirmed) {
    localStorage.removeItem("dataSiswa");
    history.push("/");
      }
    });
  };

  const user = JSON.parse(localStorage.getItem("dataSiswa"));
  

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

                fontWeight: '600'
              }}> 
              {/* Hi, {user ? user.nama[0] : null} */}
              </span>
            </Navbar.Text>
            <Navbar.Toggle aria-controls="offcanvasNavbar" className="burger"/>
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  {/* Hi, {user ? user.nama[0]:null} */}
                  </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link> <Link to='/user/' style={{textDecoration: 'none'}} >Home</Link> </Nav.Link>
                  <Nav.Link> <Link to='/user/transaksi/'style={{textDecoration: 'none'}} >Transaksi</Link> </Nav.Link>
                  <Nav.Link> <Link to='/user/profile/'style={{textDecoration: 'none'}} >Profile</Link> </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
      {/* <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          className="navbar"
          fixed="bottom"
        >
          <Container className="container">
            <Link to="/user/transaksi">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faCreditCard} />
            </center>
            <p style={{ display: text }}>Transaksi</p>
          </span>
        </Link>
            <Link to="/user/transaksi">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faCreditCard} />
            </center>
            <p style={{ display: text }}>Transaksi</p>
          </span>
        </Link>
            <Link to="/user/transaksi">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faCreditCard} />
            </center>
            <p style={{ display: text }}>Transaksi</p>
          </span>
        </Link>
            <Link to="/user/transaksi">
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faCreditCard} />
            </center>
            <p style={{ display: text }}>Transaksi</p>
          </span>
        </Link>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav className="nav">
                <Nav.Link href="#deets">
                  <FontAwesomeIcon icon={faBell} />
                </Nav.Link>
                <Nav.Link href="#memes">{user.nama[0]}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Log out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}
      {/* Sidebar */}

      <div className={sidebar}>
        <br />

        <Link to="/user" style={{textDecoration: 'none'}}>
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faHome} />
            </center>
            <p style={{ display: text }}>Home</p>
          </span>
        </Link>

        <br />
        <Link to="/user/transaksi" style={{textDecoration: 'none'}}>
          <span className="menu">
            <center className="logo">
              <FontAwesomeIcon icon={faCreditCard} />
            </center>
            <p style={{ display: text }}>Transaksi</p>
          </span>
        </Link>

        <br />
        <Link to="/user/profile" style={{textDecoration: 'none'}}>
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
    {/* <div id="myModal" class="modal" > */}
    <div className="qrcode" style={{display: qr }} onClick={changeQr}> 
                  <div id="myModal" class="modal">

                    {/* <!-- Modal content --> */}
                    <div class="modal-content" >
                      <QRCode
                        className="qrcode"
                        value={user.nis[0]}
                        size={220}
                        />
                    </div>
                  </div >
            </div>

        <Route exact path="/user/" component={Dashboard} />
        <Route
          exact
          path="/user/pembayaran/bebas/:id"
          component={PembayaranBebas}
        />

        <Route exact path="/user/transaksi" component={Transaksi} />
        <Route exact path="/user/profile" component={ProfileSiswa} />
        <Route exact path="/user/profile/ubah/" component={UbahProfileSiswa} />
        <ProtectedRoute
          exact
          path="/user/invoice/bulanan/:id"
          component={Invoice}
        />
         
        <ProtectedRoute
          exact
          path="/user/invoice/bebas/:id/:d_bebas_id/"
          component={InvoiceBebas}
        />
    <br/>
    <br/>
    <br/>

      </div>



             {/* Navbar Bottom */}
             <div className="navbar-bottom">
             
              <Navbar  className="navbar" fixed="bottom">
                  <Container style={{maxWidth:'380px'}}>
                      <Link to="/user" style={{textDecoration: 'none',marginTop:'-10px',color:'black'}}>
                         <span className="menu-bottom-bar">
                        <center>
                          <FontAwesomeIcon icon={faHome}  className="logo"/>
                        </center>
                        <p style={{ fontSize:'12px', marginBottom:'-6px'}}>Home</p>
                      </span>
                      </Link>
          
                      <Link to="/user/transaksi" style={{textDecoration: 'none',marginTop:'-10px',color:'black'}}>
                        <span className="menu-bottom-bar">
                          <center >
                            <FontAwesomeIcon icon={faCreditCard} className="logo"/>
                          </center>
                          <p style={{ fontSize:'12px', marginBottom:'-6px'}}>Transaksi</p>
                        </span>
                      </Link>

                      <span className="menu-bottom-bar" onClick={changeQr}>
                        <center >
                        <Image src={Qr} style={{width:'64px', height:'auto', marginTop:'-24px'}}/>
                        </center>
                      </span>
          
                      <Link to="/user/profile" style={{textDecoration: 'none',marginTop:'-10px',color:'black'}}>
                        <span className="menu-bottom-bar">
                          <center >
                            <FontAwesomeIcon icon={faUser} style={{marginTop:'14px'}}/>
                          </center>
                            <p style={{ fontSize:'12px', marginBottom:'-6px'}}>Profile</p>
                        </span>
                      </Link>
          

                      <span className="menu-bottom-bar"  onClick={handleLogout}>
                        <center >
                           <FontAwesomeIcon icon={faSignOutAlt}/>
                        </center>
                           <p style={{ fontSize:'12px', marginBottom:'-6px'}}>Log out</p>
                      </span>

                  </Container>
                </Navbar>
             </div>
    </div>
  );
};

export default SideBar;
