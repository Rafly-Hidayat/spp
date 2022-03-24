import React, { useState } from 'react'
import ProtectedRoute from '../../ProtectedRoute'
import { useHistory } from 'react-router';
import { Container, Navbar, Nav, NavDropdown, Card, Row, Col, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCreditCard, faHome, faBell, faCog } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import logo from '../Assets/LandingPageImg/Logo.png'

import './SideBarUser.css'

import Dashboard from '../DashboardUser/DashboardUser'
import Transaksi from '../Transaksi/Transaksi'
import Logout from '../Logout/Logout'
import PembayaranBebas from '../PembayaranBebas/PembayaranBebas';
import ProfileSiswa from './../Profile/ProfileSiswa';
import UbahProfileSiswa from '../Profile/UbahProfileSiswa'
import Invoice from '../PembayaranBulanan/Invoice'

const SideBar = () => {
    const [sidebar, setSidebar] = useState('sidebar');
    const [main, setMain] = useState('main');
    const [text, setText] = useState('block');
    const [button, setbutton] = useState('button');

    const [mode, setMode] = useState(1);

    const changeSidebar = () => {

        if (mode == 0) {
            setSidebar('sidebar1');
            setMain('main1');
            setbutton('button1');
            setText('none');
            setMode(1);
        }
        else {
            setSidebar('sidebar');
            setMain('main');
            setbutton('button');
            setText('block');
            setMode(0);
        }
    };
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("dataSiswa");
        history.push("/");
    };

    const user = JSON.parse(localStorage.getItem("dataSiswa"));
    console.log(user)

    return (
        <div>
            <div className='user'>
                {/* Navbar */}
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='navbar' fixed='top'>
                    <Container className='container'>
                        <Navbar.Brand><Image onClick={changeSidebar} className="logo" src={logo} /> <span className='title1'>Sistem Pembayaran Sekolah</span><span className='title2'>SPS</span></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>
                            <Nav className='nav'>
                                <Nav.Link href="#deets"><FontAwesomeIcon icon={faBell} /></Nav.Link>
                                <Nav.Link href="#memes">
                                    {user.nama[0]}
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout}>
                                    Log out
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>

                </Navbar>

            </div>

            {/* Sidebar */}

            <div className={sidebar} >
                <br />

                <Link to="/user">
                    <span className='menu'>
                        <center className='logo'><FontAwesomeIcon icon={faHome} /></center>
                        <p style={{ display: text }}>Home</p>
                    </span>
                </Link>

                <br />
                <Link to="/user/transaksi">
                    <span className='menu'>
                        <center className='logo'><FontAwesomeIcon icon={faCreditCard} /></center>
                        <p style={{ display: text }}>Transaksi</p>
                    </span>
                </Link>

                <br />
                <Link to="/user/profile">
                    <span className='menu'>
                        <center className='logo'><FontAwesomeIcon icon={faUser} /></center>
                        <p style={{ display: text }}>Profile</p>
                    </span>
                </Link>

                <br />
                <span className='menu'>
                    <center className='logo'><FontAwesomeIcon icon={faCog} /></center>
                    <p style={{ display: text }}>Setting</p>
                </span>

            </div>

            <div className={main}>

                <Route exact path="/user/" component={Dashboard} />
                <Route exact path="/user/pembayaran/bebas/:id" component={PembayaranBebas} />


                <Route exact path="/user/transaksi" component={Transaksi} />
                <Route exact path="/user/profile" component={ProfileSiswa} />
                <Route exact path="/user/profile/ubah/" component={UbahProfileSiswa} />

                <ProtectedRoute exact path="/user/profile" component={Profile} />
                <ProtectedRoute exact path="/user/invoice/bulanan/:id" component={Invoice} />

                <ProtectedRoute exact path="/logout" component={Logout} />
            </div>
        </div>
    )
}

export default SideBar;


