import React, { Component } from 'react'
import { Container, Row, Col, Image, Table, Button, Form, Nav, Navbar, FormControl, NavDropdown } from 'react-bootstrap';
import user from '../Assets/user.jpg';

import './Akun.css';

export default class Akun extends Component {
    render() {
        return (
            <div>
                {/* navbar */}

                <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    <Container >
                        <Navbar.Brand href="#">SPP</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        {/* <Navbar.Collapse id="navbarScroll justify-content-end">
                            <Nav
                                className="me-auto"
                            >
                                <Nav.Link className="setting" href="#action1" >setting</Nav.Link>
                            </Nav>
                        </Navbar.Collapse> */}
                    </Container>
                </Navbar>


                {/* content */}

                <Container>
                    <div className="title">
                        <h1>Siswa</h1>
                        <p>Periksa pembayaran administrasi mu disini</p>
                    </div>
                    <Row>
                        <Col md="3">
                            <div className="user">
                                <center>
                                    <Image className="img-user" src={user} roundedCircle />

                                    <h6 className="nis-user">1902004</h6>
                                    <h3 className="nama-user">Elon Muskulin </h3>
                                    <h6 className="kelas-user">XII RPL 3</h6>

                                    <Button variant="primary">Qr Code</Button>
                                </center>
                            </div>
                        </Col>
                        <br />
                        <Col md="9">
                            <div className="table">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Pembayaran</th>
                                            <th>Tanggal</th>
                                            <th>Nominal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                        <tr>
                                            <td>Sumb. Pendidikan</td>
                                            <td>21-07-01</td>
                                            <td>Rp. 1.800.000</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
