import React, { Component } from 'react';
import { Container, Navbar, Nav, NavDropdown, Card, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Slider from "react-slick"

import NavBar from '../NavBar/NavBar';

import logo from '../Assets/LandingPageImg/Logo.png'
import logoBg from '../Assets/LandingPageImg/LogoBg.png'

import imgPage1 from '../Assets/LandingPageImg/img1.png'
import imgPage2 from '../Assets/LandingPageImg/img2.png'
import imgPage3 from '../Assets/LandingPageImg/img3.png'

import display1 from '../Assets/LandingPageImg/display1.png'
import display2 from '../Assets/LandingPageImg/display2.png'

import icon1 from '../Assets/LandingPageImg/icon1.png'
import icon2 from '../Assets/LandingPageImg/icon2.png'
import icon3 from '../Assets/LandingPageImg/icon3.png'
import icon4 from '../Assets/LandingPageImg/icon4.png'
import icon5 from '../Assets/LandingPageImg/icon5.png'
import icon6 from '../Assets/LandingPageImg/icon6.png'

import './LandingPage.css'

export default class LandingPage extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        const loggedIn = localStorage.getItem('dataAdmin')
        if (loggedIn) {
            this.props.history.push('/admin')
        }
        return (
            <div>
                <div className="navForLandingPage" id='home'>
                    <NavBar />

                    <Navbar collapseOnSelect expand="lg" variant="light" className='navbar'>
                        <Container>
                            <Navbar.Brand href="#home"> <Image className="logo" src={logo} /> <b>Sistem Pembayaran Sekolah</b>  </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav " className='justify-content-end'>
                                <Nav className="me-auto nav">
                                    <Nav.Link href="#home" active> <h6><b>Home</b></h6>  </Nav.Link>
                                    <Nav.Link href="#beranda"> <h6>Beranda</h6> </Nav.Link>
                                    <Nav.Link href="#features"> <h6>Features</h6> </Nav.Link>
                                    <Link to="/login">
                                        <Nav.Link href="/login"> <Button className='btn-login'>Log in</Button></Nav.Link>
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <Container>
                    <div className="page1" >
                        <Row>
                            <Col md={6}>
                                <div className="page1-content">
                                    <h1>Cara Baru Bayar <br />
                                        Uang Pendidikan</h1>
                                    <h3>Sistem Pembayaran Uang Sekolah</h3>
                                    <p>Platform bagi murid dan orang tua untuk membayar
                                        keperluan sekolah dari aplikasi pembayaran favorit mereka</p>
                                    <Button href="/admin/login" className='btn1'>Log in</Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="page1-img">
                                    <Image className="img1" src={imgPage1} />
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="page2" id='beranda'>
                        <Row>
                            <Col md={5}>
                                <div className="page2-img">
                                    <Image className="img2" src={imgPage2} />
                                </div>
                            </Col>

                            <Col md={{ span: 5, offset: 2 }}>
                                <div className="page2-content">
                                    <h1>Melalui Banyak <br /> Metode Pembayaran</h1>

                                    <div className="page2-icon">
                                        <div className="page2-icon1">
                                            <Image className="icon" src={icon1} />
                                            <h3>Credit/Debit</h3>
                                        </div>
                                        <div className="page2-icon2">
                                            <Image className="icon" src={icon2} />
                                            <h3>e-Wallet</h3>
                                        </div>
                                        <div className="page2-icon3">
                                            <Image className="icon" src={icon3} />
                                            <h3>Transfer Bank</h3>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="page3">
                        <Row>
                            <Col md={4}>
                                <div className="page3-content">
                                    <h1>Informasi Kegunaan Platform</h1>
                                    <p>Semua tagihan seperti SPP, Uang Buku, Sumbangan
                                        dan lain-lain, akan lebih mudah diinformasikan dan
                                        dibayarkan oleh orang tua siswa melalui web.</p>
                                </div>
                            </Col>

                            <Col md={{ span: 7, offset: 1 }}>
                                <div className="page3-imgslide">
                                    <Image className="cover" src={imgPage3} />
                                    <div className="hello">
                                        <Slider {...settings}>
                                            <div>
                                                <span className="cover-img"><Image className="img3" src={display1} /></span>
                                            </div>
                                            <div>
                                                <span className="cover-img"><Image className="img3" src={display2} /></span>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="page4" id='features'>
                        <div className="page4-title">
                            <h1>FEATURES</h1>
                            <p>Merupakan jasa layanan bagi lembaga pendidikan berupa penerimaan biaya pendidikan dan biaya lainnya <br />
                                yang terkait dengan penyelenggaraan pendidikan secara daring ataupun tatap muka
                            </p>
                        </div>
                        <div className="page4-content">
                            <Row>
                                <Col md={4} className='col'>
                                    <div className="contentBx">
                                        <Image className="icon" src={icon4} />
                                        <h2>Data Pembayaran</h2>
                                        <p>biaya pendidikan dapat mudah diintegrasikan dengan sistem administrasi lembaga pendidikan </p>
                                    </div>
                                </Col>
                                <Col md={4} className='col'>
                                    <div className="contentBx">
                                        <Image className="icon" src={icon5} />
                                        <h2>Real Time</h2>
                                        <p>Data dapat diketahui setiap saat dan dapat diakses secara online </p>
                                    </div>
                                </Col>
                                <Col md={4} className='col'>
                                    <div className="contentBx">
                                        <Image className="icon" src={icon6} />
                                        <h2>Details Info</h2>
                                        <p>Informasi lengkap untuk user
                                            riwayat transaksi dan pembayaran yang perlu dibayar </p>
                                    </div>
                                </Col>
                                <Col md={4} className='col'>
                                    <div className="contentBx">
                                        <Image className="icon" src={icon4} />
                                        <h2>Konsultansi online</h2>
                                        <p>Layanan konsultasi bila informasi kurang jelas atau tidak dapat dimengerti dll</p>
                                    </div>
                                </Col>
                                <Col md={4} className='col'>
                                    <div className="contentBx">
                                        <Image className="icon" src={icon5} />
                                        <h2>Payment Reminder</h2>
                                        <p>Pembayaran yang telah jatuh tempo akan diingatkan melalui channel sms ataupun email. </p>
                                    </div>
                                </Col>
                                <Col md={4} className='col'>
                                    <div className="contentBx">
                                        <Image className="icon" src={icon6} />
                                        <h2>Keamanan</h2>
                                        <p>Keamanan data pembayaran murid 100% tersimpan dengan baik</p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
                <div className="footer">
                    <Container>
                        <div className="footer-content">
                            <Row>
                                <Col md={4} className='content1'>
                                    <div className="brand">
                                        <Image className="logoBg" src={logoBg} />
                                        <h4>Sistem Pembayaran Sekolah</h4>
                                    </div>
                                    <br />
                                    <p>Jl. Lap Bola Rawa Butun Ciketing Udik Bantargebang Kota Bekasi 17153
                                        Phone: (021) 82597121
                                        Email: smkn2kotabekasi@gmail.com</p>
                                    <p>©XII RPL 3 2022. All rights reserved</p>
                                </Col>
                                <Col md={{ span: 2, offset: 2 }} className='content2'>
                                    <h4>About Us</h4>
                                    <p>Profile sekolah
                                        Testimonials
                                    </p>
                                </Col>
                                <Col md={4} className='content3'>
                                    <h4>Kompetesi Keahlian</h4>
                                    <p>
                                        <ul>
                                            <li>Rekayasa perangkat lunak</li>
                                            <li>Teknik Komputer dan Jaringan</li>
                                            <li>Teknik Elektronika Industri</li>
                                            <li>Teknik dan Bisnis Sepeda Motor</li>
                                            <li>Akuntansi dan Keungan Lembaga</li>
                                            <li>Teknik Energi Biomassa</li>
                                        </ul>
                                    </p>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}
