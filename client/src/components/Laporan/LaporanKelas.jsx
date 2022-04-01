import React, { Component } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  FormSelect,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class LaporanKelas extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      data_bebas: [],
      data_bulanan: [],
      total_bebas: "",
      total_bulanan: "",
      data_kelas: [],
      data_jurusan: [],
      data_d_kelas: [],
      kelas: "",
      jurusan: "",
      d_kelas: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8000/kelas").then((res) => {
      this.setState({
        data_kelas: res.data,
      });
    });
    axios.get("http://localhost:8000/jurusan").then((res) => {
      this.setState({
        data_jurusan: res.data,
      });
    });
    axios.get("http://localhost:8000/d_kelas").then((res) => {
      this.setState({
        data_d_kelas: res.data,
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      const data = {
        kelas_id: this.state.kelas,
        jurusan_id: this.state.jurusan,
        d_kelas_id: this.state.d_kelas,
      };
      axios
        .post("http://localhost:8000/laporan/kelas/bebas", data)
        .then((res) => {
          if (res.data.error !== true) {
            console.log(res.data);
            this.setState({
              data_bebas: res.data.data,
              total_bebas: res.data.sisa_tagihan_kelas,
            });
          } else {
            this.setState({
              data_bebas: "",
            });
          }
        });
      axios
        .post("http://localhost:8000/laporan/kelas/bulanan", data)
        .then((res) => {
          console.log(res.data.data);
          if (res.data.error !== true) {
            this.setState({
              data_bulanan: res.data.data,
              total_bulanan: res.data.sisa_tagihan_kelas,
            });
          } else {
            this.setState({
              data_bulanan: "",
            });
          }
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    console.log(this.state.data_bulanan);
    // data bebas
    const data = this.state.data_bebas;
    const as = [];
    const total_bebas = this.state.total_bebas;

    // data bulanan
    const data2 = this.state.data_bulanan;
    const total_bulanan = this.state.total_bulanan;

    // bulanan
    const sisa_bulanan = [
      {
        text: "Total Sisa Tagihan Kelas",
        headerStyle: (colum, colIndex) => {
          return { width: "70%", fontWeight: "light" };
        },
      },
      {
        // if sisa_tagihan_kelas is undefined, then it will be 0
        text: total_bulanan
          ? `Rp. ${parseInt(total_bulanan).toLocaleString()}`
          : `Rp. 0`,
      },
    ];
    const data_bulanan = [
      {
        text: "Nama Siswa",
        dataField: "siswa_nama",
        headerStyle: {
          width: "30%",
        },
      },
      {
        text: "Kelas",
        formatter: (cell, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
        headerStyle: {
          width: "20%",
        },
      },
      {
        dataField: "periode",
        text: "periode",
        headerStyle: {
          width: "20%",
        },
      },
      {
        text: "Sisa Bulan",
        dataField: "sisa_bulan",
        headerStyle: {
          width: "20%",
        },
      },
      {
        text: "Sisa Tagihan",
        headerStyle: {
          width: "30%",
        },
        formatter: (cell, row) => {
          return (
            <div>{`Rp. ${parseInt(row.sisa_tagihan).toLocaleString()}`}</div>
          );
        },
      },
    ];
    const headers = [
      {
        label: "Siswa Nama",
        key: "siswa_nama",
      },
      {
        label: "Kelas",
        key: "kelas_nama",
      },
      {
        label: "Sisa Bulan",
        key: "sisa_bulan",
      },
      {
        label: "Sisa Tagihan",
        key: "sisa_tagihan",
      },
    ];

    // bebas
    const sisa_bebas = [
      {
        text: "Total Sisa Tagihan Kelas",
        headerStyle: (colum, colIndex) => {
          return { width: "50%", fontWeight: "light" };
        },
      },
      {
        // if sisa_tagihan_kelas is undefined, then it will be 0
        text: total_bebas
          ? `Rp. ${parseInt(total_bebas).toLocaleString()}`
          : `Rp. 0`,
      },
    ];
    const data_bebas = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        headerStyle: (colum, colIndex) => {
          return { width: "30%" };
        },
      },
      {
        text: "Kelas",
        formatter: (cell, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
        headerStyle: (colum, colIndex) => {
          return { width: "20%" };
        },
      },
      {
        dataField: "periode",
        text: "periode",
        headerStyle: {
          width: "25%",
        },
      },
      {
        text: "Sisa Tagihan",
        formatter: (cell, row) => {
          return <div>Rp. {parseInt(row.sisa_tagihan).toLocaleString()}</div>;
        },
        headerStyle: {
          width: "25%",
        },
      },
    ];
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Laporan Kelas</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex">
                <Row>
                  <Col xs={6} md="auto">
                    <Form.Group as={Row} className="mb-3">
                      <Col md="auto">
                        <Form.Label column sm="auto">
                          Kelas
                        </Form.Label>
                      </Col>
                      <Col md="auto">
                        <FormSelect name="kelas" onChange={this.handleChange}>
                          <option value="">=== Pilih Kelas ===</option>
                          {this.state.data_kelas.map((k) => {
                            return (
                              <option key={k.kelas_id} value={k.kelas_id}>
                                {k.kelas_nama}
                              </option>
                            );
                          })}
                        </FormSelect>
                        <div>
                          {this.validator.message(
                            "kelas",
                            this.state.kelas,
                            `required`,
                            {
                              className: "text-danger",
                              messages: {
                                required: "Pilih Kelas!",
                              },
                            }
                          )}
                        </div>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={6} md="auto">
                    <Form.Group as={Row} className="mb-3">
                      <Col md="auto">
                        <Form.Label column sm="auto">
                          Jurusan
                        </Form.Label>
                      </Col>
                      <Col md="auto">
                        <FormSelect name="jurusan" onChange={this.handleChange}>
                          <option value="">=== Pilih Jurusan ===</option>
                          {this.state.data_jurusan.map((j) => {
                            return (
                              <option key={j.jurusan_id} value={j.jurusan_id}>
                                {j.jurusan_nama}
                              </option>
                            );
                          })}
                        </FormSelect>
                        <div>
                          {this.validator.message(
                            "jurusan",
                            this.state.jurusan,
                            `required`,
                            {
                              className: "text-danger",
                              messages: {
                                required: "Pilih Kelas!",
                              },
                            }
                          )}
                        </div>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={6} md="auto">
                    <Form.Group as={Row} className="mb-3">
                      <Col md="auto">
                        <Form.Label column sm="auto">
                          Daftar Kelas
                        </Form.Label>
                      </Col>
                      <Col md="auto">
                        <FormSelect name="d_kelas" onChange={this.handleChange}>
                          <option value="">=== Pilih Daftar Kelas ===</option>
                          {this.state.data_d_kelas.map((dk) => {
                            return (
                              <option key={dk.d_kelas_id} value={dk.d_kelas_id}>
                                {dk.d_kelas_nama}
                              </option>
                            );
                          })}
                        </FormSelect>
                        <div>
                          {this.validator.message(
                            "d_kelas",
                            this.state.d_kelas,
                            `required`,
                            {
                              className: "text-danger",
                              messages: {
                                required: "Pilih Kelas!",
                              },
                            }
                          )}
                        </div>
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col xs={6} md="auto">
                    <Form.Group as={Row} className="mb-3">
                      <Col md="auto">
                        <Button type="submit" variant="outline-primary">
                          Q
                        </Button>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
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
                  data={data2}
                  columns={data_bulanan}
                  striped
                  hover
                  condensed
                  bordered={false}
                  noDataIndication="Data tidak ditemukan"
                />
                <BootstrapTable
                  keyField="id"
                  data={as}
                  columns={sisa_bulanan}
                  bordered={false}
                />
              </Tab>
              <Tab eventKey="bebas" title="Bebas">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={data}
                  columns={data_bebas}
                  striped
                  hover
                  condensed
                  bordered={false}
                  noDataIndication="Data tidak ditemukan"
                />
                <BootstrapTable
                  keyField="id"
                  data={as}
                  columns={sisa_bebas}
                  bordered={false}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
