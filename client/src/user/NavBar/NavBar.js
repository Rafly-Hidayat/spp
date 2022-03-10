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

                    <Navbar collapseOnSelect id="nav" expand="lg" className='navbar'>
                        <Container>
                            <Navbar.Brand href="#home"> <Image className="logo" src={logo} /> <span className='title1'>Sistem Pembayaran Sekolah</span><span className='title2'>SPS</span>  </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">

                                </Nav>
                                <Nav className='nav'>
                                    <Nav.Link href="#home"> <h6>Home</h6>  </Nav.Link>
                                    <Nav.Link href="#beranda"> <h6>Beranda</h6> </Nav.Link>
                                    <Nav.Link href="#features"> <h6>Features</h6> </Nav.Link>
                                    <Link to="/login">
                                        <Nav.Link href="/Login"> <Button className='btn-login'>Log in</Button></Nav.Link>
                                    </Link>
                                </Nav>
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
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("nav").style.top = "0";
    } else {
        document.getElementById("nav").style.top = "-150px";
    }
}