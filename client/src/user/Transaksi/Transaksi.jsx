import React, { Component } from "react";
import {
  Container,
  Tabs,
  Tab,
  Card,
  Table,
  Button,
  Form,
  Nav,
  Col,
  Row,
  NavDropdown,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Bebas from "../PembayaranBebas/PembayaranBebas";
import Bulanan from "../PembayaranBulanan/PembayaranBulanan";

export default class Transaksi extends Component {
  render() {
    return (
      <div>
        <br />
        <h3 style={{ paddingBottom: "10px" }}>Transaksi</h3>

        <Card style={{ color: "black", justifyItems: "space-between" }}>
          <Card.Header>Rekening Sekolah<span className="text-danger">*</span></Card.Header>
          <ListGroup as="ol">
            <ListGroup.Item as="li">
              BJB SYARIAH : 54201-02000-070
            </ListGroup.Item>
            <ListGroup.Item as="li">BTN : 0001-6013-0002-7682 </ListGroup.Item>
            <strong><ListGroup.Item>A/N SMKN2 KOTA BEKASI</ListGroup.Item></strong>
          </ListGroup>
        </Card>
        <br />
        <Card style={{ background: "#f5f5f5", color: "black" }}>
          <Card.Body>
            <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Bulanan">
                <br />
                <Bulanan />
              </Tab>
              <Tab eventKey="profile" title="Bebas">
                <br />
                <Bebas />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>

      </div>
    );
  }
}
