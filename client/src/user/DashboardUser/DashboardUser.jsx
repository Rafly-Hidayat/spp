import React, { Component } from 'react'
import { Container, Tabs, Tab, Card, Nav, ProgressBar, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCreditCard, faHome, faBell, faCog } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'sassy-datepicker';

import Bulanan from '../PembayaranBulanan/PembayaranBulanan';
import Bebas from '../PembayaranBebas/PembayaranBebas';

import './DashboardUser.css'
export default class DashboardUser extends Component {
    constructor(props) {
        super(props);
        let bayar = 70
        let tagihan = 200
        this.state = {
            count1: bayar / tagihan * 100
        };

    }


    render() {
        const onChange = (date) => {
            console.log(date.toString());
        }
        return (
            <div >
                <div className="dashboard-user">
                    <br />
                    <h3 style={{ paddingBottom: "10px" }}>Dashboard</h3>

                    <div className="dashboard">
                        <Row>
                            <Col md={4}>
                                <Card style={{ background: "linear-gradient(25deg, #0073f7, #2b91e9, #2caeda, #00cbcb)", color: "white", borderRadius: "16px" }} body>
                                    <Container>
                                        <div className="content">
                                            <div className="icon-nis">
                                                <h6>190000202</h6>
                                                <Link to="#"><h6><FontAwesomeIcon icon={faCog} style={{ color: "white" }} /></h6></Link>
                                            </div>
                                            <h4>Elon Musk</h4>
                                            <br />
                                            <br />
                                            <ProgressBar animated variant="info" now={100} label={`${100}%`} className="bar" />
                                        </div>
                                    </Container>
                                </Card>
                                <br /><br />
                                <Card style={{ background: "linear-gradient(25deg, #6618e7, #7860e3, #7d93de, #76c4d8)", color: "white", borderRadius: "16px" }} body>
                                    <Container>
                                        <div className="content">
                                            <div className="icon-nis">
                                                <h6>190000202</h6>
                                                <Link to="#"><h6><FontAwesomeIcon icon={faCog} style={{ color: "white" }} /></h6></Link>
                                            </div>
                                            <h4>Elon Musk</h4>
                                            <br />
                                            <br />
                                            <ProgressBar animated variant="info" now={this.state.count1} label={`${this.state.count1}%`} className="bar" />
                                        </div>
                                    </Container>
                                </Card>
                            </Col>
                            <Col md={8}>

                                <DatePicker onChange={onChange} style={{ width: "100%", height: "100%", border: "5px absolute" }} />
                            </Col>
                        </Row>
                    </div>
                    {/* --------------------- */}

                    {/* Tampilan Mobile */}
                    <div className="transaksi-dashboard">
                        <Container>
                            <Row>
                                <Col xs={12}>
                                    <Card style={{ background: "linear-gradient(25deg, #0073f7, #2b91e9, #2caeda, #00cbcb)", color: "white", borderRadius: "16px" }} body>
                                        <Container>
                                            <div className="content">
                                                <div className="icon-name" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                                                    <h4>Bulanan</h4>
                                                    <Link to="#"><h6><FontAwesomeIcon icon={faCog} style={{ color: "white" }} /></h6></Link>
                                                </div>
                                                {/* <br /> */}
                                                <div className="icon-nis" >
                                                    <h6>190000202</h6>
                                                </div>
                                                <h4>Elon Musk</h4>
                                                <br />
                                                <br />
                                                <ProgressBar animated variant="info" now={100} label={`${100}%`} className="bar" />
                                            </div>
                                        </Container>
                                    </Card>
                                </Col>
                                <br /><br />
                                <Col xs={12}>
                                    <br />
                                    <Card style={{ background: "linear-gradient(25deg, #6618e7, #7860e3, #7d93de, #76c4d8)", color: "white", borderRadius: "16px" }} body>
                                        <Container>
                                            <div className="content">
                                                <div className="icon-name" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "10px" }}>
                                                    <h4>Bebas</h4>
                                                    <Link to="#"><h6><FontAwesomeIcon icon={faCog} style={{ color: "white" }} /></h6></Link>
                                                </div>
                                                <div className="icon-nis">
                                                    <h6>190000202</h6>
                                                </div>
                                                <h4>Elon Musk</h4>
                                                <br />
                                                <br />
                                                <ProgressBar animated variant="info" now={this.state.count1} label={`${this.state.count1}%`} className="bar" />
                                            </div>
                                        </Container>
                                    </Card>
                                </Col>
                                <Col xs={12}>
                                    <br />
                                    <DatePicker onChange={onChange} style={{ width: "100%", height: "100%", border: "5px absolute" }} />
                                </Col>
                            </Row>
                        </Container>

                        <br />
                        <br />
                        <br />
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav variant="pills" className="justify-content-center flex-column" >
                                <Container>
                                    <Row>
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link eventKey="first"><center>Bulanan</center> </Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                        <Col>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second" style={{ border: "5px" }}><center>Bebas</center></Nav.Link>
                                            </Nav.Item>
                                        </Col>
                                    </Row>
                                </Container>
                            </Nav>
                            <br />
                            <br />
                            {/* <Link to="/user/transaksi"> */}
                            <a href="/user/transaksi">
                                <h3>Transaksi</h3>
                            </a>
                            {/* <span style={{ paddingBottom: "10px", fontSize: "20px" }}>Transaksi</span> */}
                            {/* </Link> */}

                            <Card body style={{ background: "#f5f5f5", color: "black" }}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <Bulanan />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        <Bebas />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        )
    }
}