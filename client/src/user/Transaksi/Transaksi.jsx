import React, { Component } from 'react'
import { Container, Tabs, Tab, Card, Table, Button, Form, Nav, Col, Row, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";


import Bebas from '../PembayaranBebas/PembayaranBebas';
import Bulanan from '../PembayaranBulanan/PembayaranBulanan'

export default class Transaksi extends Component {
    render() {
        return (
            <div>
                <br />
                <h3 style={{ paddingBottom: "10px" }}>Transaksi</h3>
                <Card body style={{ background: "#f5f5f5", color: "black" }}>
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="home" title="Bulanan">
                            <br />
                            <Bulanan />
                        </Tab>
                        <Tab eventKey="profile" title="Bebas">
                            <br />
                            <Bebas />
                        </Tab>
                    </Tabs>
                </Card>
                <br />
                <Link to="/user">
                    <Button variant="primary" className="mr-2 " block >
                        back
                    </Button>
                </Link>
            </div>
        );
    }
}
