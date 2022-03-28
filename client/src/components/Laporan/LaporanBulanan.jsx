import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

export default class LaporanBulanan extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
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
    if (this.validator.allValid()) {
      const data = {
        tanggal_awal: this.state.date_awal,
        tanggal_akhir: this.state.date_akhir,
      };
      axios.post("http://localhost:8000/laporan/bulanan", data).then((res) => {
        console.log(res);
        this.setState({ 
          data: res.data,
        });
      }) .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Data tidak ditemukan!"
        });
      })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  render() {
    const data = this.state.data;
    console.log(data);
    const columns = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        headerStyle: (colum, colIndex) => {
          return { width: "200px" };
        },
      },
      {
        dataField: "pos_nama",
        text: "Deskripsi",
        headerAlign: "center",
        align: "center",
      },
      {
        dataField: "month_nama",
        text: "Bulan",
        headerAlign: "center",
        align: "center",
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
        headerAlign: "center",
        align: "center",
      },
      {
        dataField: "admin_nama",
        text: "Petugas",
        headerAlign: "center",
        align: "center",
      },
      {
        dataField: "tanggal",
        text: "Tanggal",
        headerAlign: "center",
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
                      <Button variant="primary" type="submit">
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
                {/* </Row> */}
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
