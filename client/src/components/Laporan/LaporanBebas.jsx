import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";

export default class LaporanBebas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date_awal: "",
      date_akhir: "",
      data: [],
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      tanggal_awal: this.state.date_awal,
      tanggal_akhir: this.state.date_akhir,
    };
    axios.post("http://localhost:8000/laporan/bebas", data).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  render() {
    const data = this.state.data;
    console.log(data);
    const columns = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        headerStyle: (colum, colIndex) => {
          return { width: "250px" };
        },
      },
      {
        dataField: "pos_nama",
        text: "Deskripsi",
        headerStyle: (colum, colIndex) => {
          return { width: "200px", textAlign: "center" };
        },
        style: (colum, colIndex) => {
          return { textAlign: "center" };
        },
      },
      {
        formatter: (cellContent, row) => {
          return <div>Rp.</div>;
        },
        headerStyle: (colum, colIndex) => {
          return { width: "40px" };
        },
      },
      {
        text: "Dibayar",
        formatter: (cell, row) => {
          return (
            // Rp. to align left
            // row.d_bebas_bayar to align right
            <div>{parseInt(row.d_bebas_bayar).toLocaleString()}</div>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "105px" };
        },
        style: (colum, colIndex) => {
          return { textAlign: "right" };
        },
      },
      {
        text: "Kelas",
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
        align: "center",
        headerStyle: (colum, colIndex) => {
          return { width: "250px", textAlign: "center" };
        },
      },
      {
        dataField: "admin_nama",
        text: "Admin",
      },
    ];
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Laporan Pembayaran Bulanan</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex">
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Tanggal Awal
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        onChange={this.handleChange}
                        name="date_awal"
                        type="date"
                        placeholder="Tanggal Awal"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                &ensp;
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Tanggal Akhir
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        onChange={this.handleChange}
                        name="date_akhir"
                        type="date"
                        placeholder="Tanggal Akhir"
                      />
                    </Col>
                  </Form.Group>
                </Col>
                &ensp;
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Button variant="primary" type="submit">
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </div>
            </Form>
            <br />
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              striped
              hover
              condensed
              bordered={false}
              noDataIndication="Data tidak ditemukan"
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
