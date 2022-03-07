import React, { Component } from 'react'
import { Container, Nav, Navbar, Image, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import logo from '../Assets/LandingPageImg/Logo.png'

import './NavBar.css';
import '../LandingPage/LandingPage.css';

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <div className="navForLandingPage">
                    <Navbar collapseOnSelect id='nav' expand="lg" variant="light" className='navbar'>
                        <Container>
                            <Navbar.Brand href="#home"> <Image className="logo" src={logo} /> <b>Sistem Pembayaran Sekolah</b>  </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav ">
                                <Nav className="me-auto nav">
                                    <Nav.Link href="#home" active> <h6><b>Home</b></h6>  </Nav.Link>
                                    <Nav.Link href="#beranda"> <h6>Beranda</h6> </Nav.Link>
                                    <Nav.Link href="#features"> <h6>Features</h6> </Nav.Link>
                                    <Link to="/login">
                                        <Nav.Link href="/Login"> <Button className='btn-login'>Log in</Button></Nav.Link>
                                    </Link>                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div >
        )
    }
}

// Navbar Magic

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("nav").style.top = "0";
    } else {
        document.getElementById("nav").style.top = "-150px";
    }
}