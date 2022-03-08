import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Form } from "react-bootstrap";

export default class AddJenisPembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodes: [],
      datapos: [],
      jenispembayaran: "",
      periode: "",
      pos: "",
    };
  }

  getPeriode = () => {
    axios.get("http://localhost:8000/periode/").then((res) => {
      this.setState({
        periodes: res.data,
      });
    });
  };
  getPos = () => {
    axios.get("http://localhost:8000/pos/").then((res) => {
      this.setState({
        datapos: res.data,
      });
    });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();
    const data = {
      pembayaran_tipe: this.state.jenispembayaran,
      periode_id: this.state.periode,
      pos_id: this.state.pos,
    };
    console.log("Data : ", data)
    axios
      .post("http://localhost:8000/tambah/pembayaran/", data)
      .then((res) => {
        console.log(res)
        this.props.history.push("/admin/jenispembayaran");
      })
      .catch((err) => {});
  };

  componentDidMount() {
    this.getPeriode();
    this.getPos();
  }
  render() {
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Header>
            <Card.Title as="h5">Tambah Jenis Pembayaran</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={this.Submit}>
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Nama Jenis Pembayaran
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="jenispembayaran"
                    id="jenispembayaran"
                    noValidate
                    onChange={this.handleChange}
                  >
                    <option>Pilih Jenis Pembayaran</option>
                    <option value="BULANAN">Pembayaran SPP Bulanan</option>
                    <option value="BEBAS">Pembayaran SAT</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Tahun Ajaran
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="periode"
                    id="periode"
                    noValidate
                    onChange={this.handleChange}
                  >
                    <option>Pilih Tahun Ajaran</option>
                    {this.state.periodes.map((data) => {
                      return (
                        <option value={data.periode_id}>
                          {data.periode_mulai}/{data.periode_akhir}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm="3">
                  Nama Pos
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    name="pos"
                    id="pos"
                    noValidate
                    onChange={this.handleChange}
                  >
                    <option>Pilih Pos</option>
                    {this.state.datapos.map((data) => {
                      return (
                        <option value={data.pos_id}>{data.pos_nama}</option>
                      );
                    })}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Button variant="primary" type="submit">
                Tambah Jenis Pembayaran
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
