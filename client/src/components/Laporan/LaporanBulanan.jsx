import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

export default class LaporanBulanan extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Laporan";

    this.validator = new SimpleReactValidator();

    this.state = {
      date_awal: "",
      date_akhir: "",
      data_bebas: [],
      data_bulanan: [],
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
    if (this.validator.allValid()) {
      const data = {
        tanggal_awal: this.state.date_awal,
        tanggal_akhir: this.state.date_akhir,
      };
      axios
        .post("https://api-sps.my.id/laporan/bulanan", data)
        .then((res) => {
          
          this.setState({
            data_bulanan: res.data,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Data tidak ditemukan!",
          });
        });
      axios
        .post("https://api-sps.my.id/laporan/bebas", data)
        .then((res) => {
          this.setState({
            data_bebas: res.data,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal!",
            text: "Data tidak ditemukan!",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const data_bebas = this.state.data_bebas;
    const data_bulanan = this.state.data_bulanan;
    
    const bulanan = [
      {
        dataField: "tanggal",
        text: "Tanggal",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "300px" };
        },
      },
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        headerStyle: (colum, colIndex) => {
          return { width: "300px" };
        },
      },
      {
        dataField: "pos_nama",
        text: "Pembayaran",
      },
      {
        dataField: "month_nama",
        text: "Bulan",
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
      },
      {
        dataField: "admin_nama",
        text: "Petugas",
      },
    ];
    const bebas = [
      {
        dataField: "tanggal",
        text: "Tanggal",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "90px" };
        },
      },
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        headerStyle: (colum, colIndex) => {
          return { width: "130px" };
        },
      },
      {
        dataField: "pos_nama",
        text: "Pembayaran",
        headerStyle: (colum, colIndex) => {
          return { width: "65px" };
        },
      },
      {
        dataField: "d_bebas_deskripsi",
        text: "Keterangan",
        headerStyle: (colum, colIndex) => {
          return { width: "55px" };
        },
      },
      {
        text: "Nominal",
        formatter: (cell, row) => {
          return (
            // Rp. to align left
            // row.d_bebas_bayar to align right
            <div>Rp. {parseInt(row.d_bebas_bayar).toLocaleString()}</div>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "75px" };
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
        headerStyle: (colum, colIndex) => {
          return { width: "50px" };
        },
      },
      {
        dataField: "admin_nama",
        text: "Petugas",
        headerStyle: (colum, colIndex) => {
          return { width: "50px" };
        },
      },
    ];
    const defaultSort = [
      {
        dataField: "tanggal",
        order: "asc",
      },
    ];
    // const defaultSort = {
    //   defaultSortName: "tanggal",
    //   defaultSortOrder: "asc",
    // };
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Laporan Pembayaran</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex">
                {/* <Row> */}
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
                      <div>
                        {this.validator.message(
                          "date_awal",
                          this.state.date_awal,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih Tanggal Awal",
                            },
                          }
                        )}
                      </div>
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
                      <div>
                        {this.validator.message(
                          "date_akhir",
                          this.state.date_akhir,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih Tanggal Awal",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                &ensp;
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Button variant="outline-primary" type="submit">
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
                {/* </Row> */}
              </div>
            </Form>
            <br />
            <Tabs
              defaultActiveKey="bulan"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="bulan" title="Bulanan">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={data_bulanan}
                  columns={bulanan}
                  striped
                  hover
                  condensed
                  bordered={false}
                  defaultSorted={defaultSort}
                  noDataIndication="Data tidak ditemukan"
                />
              </Tab>
              <Tab eventKey="bebas" title="Bebas">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={data_bebas}
                  columns={bebas}
                  striped
                  hover
                  condensed
                  bordered={false}
                  noDataIndication="Data tidak ditemukan"
                  defaultSorted={defaultSort}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
