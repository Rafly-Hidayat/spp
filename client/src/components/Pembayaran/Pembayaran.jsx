import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  FormSelect,
  Row,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import InformasiSIswa from "./InformasiSIswa";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import QRScan from "qrscan";

export default class Pembayaran extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Pembayaran";
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.state = {
      visible: false,
      periodes: [],
      nis: "",
      periode: "",
      value: "",
      watching: false,
      data: [],
      databulanan: [],
    };

    this.onFind = this.onFind.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.allValid() && this.state.periode !== "") {
      axios
        .get(`http://localhost:8000/siswa_nis/${this.state.nis}`)
        .then((res) => {
          if (res.data[0] === undefined) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "NIS Siswa tidak ditemukan!",
            });
          } else {
            this.setState({
              visible: true,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal terhubung ke server!",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  componentDidMount() {
    axios.get(`http://localhost:8000/periode`).then((res) => {
      this.setState({
        periodes: res.data,
      });
    });
    if (this.props.location.state) {
      this.setState({
        nis: this.props.location.state.nis,
        periode: this.props.location.state.periode,
      });
      axios
        .get(`http://localhost:8000/siswa_nis/${this.props.location.state.nis}`)
        .then((res) => {
          if (res.data[0] === undefined) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "NIS Siswa tidak ditemukan!",
            });
          } else {
            this.setState({
              visible: true,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal terhubung ke server!",
          });
        });
    }
  }

  onFind(nis) {
    this.setState({ nis, watching: false });
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Breadcrumb
              style={{
                marginTop: "-10px",
                marginBottom: "-22px",
              }}
            >
              <Breadcrumb.Item>
                <Link to="/admin/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Tahun Ajaran
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <FormSelect name="periode" onChange={this.handleChange}>
                        <option value="">Pilih Tahun Ajaran</option>
                        {this.state.periodes.map((item, key) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.periode_mulai}/{item.periode_akhir}
                            </option>
                          );
                        })}
                      </FormSelect>
                      <div>
                        {this.validator.message(
                          "periode",
                          this.state.periode,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih tahun ajaran!",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Cari Siswa
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="NIS Siswa"
                        name="nis"
                        value={this.state.nis}
                        onChange={this.handleChange}
                      />
                      <div>
                        {this.validator.message(
                          "nis",
                          this.state.nis,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Masukkan NIS Siswa!",
                              int: "NIS Siswa harus berupa angka!",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col className="d-flex">
                      <Button type="submit" variant="outline-primary">
                        Cari Siswa
                      </Button>
                      &ensp;
                      <Button
                        type="scan"
                        variant="outline-primary"
                        onClick={() => this.setState({ watching: true })}
                      >
                        Scan
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br />
        {this.state.watching ? (
          <Card body style={{ width: "auto" }}>
            <center>
              <QRScan onFind={this.onFind} />
            </center>
          </Card>
        ) : (
          <span></span>
        )}
        <br />
        {this.state.visible ? (
          <InformasiSIswa periode={this.state.periode} nis={this.state.nis} />
        ) : null}
      </div>
    );
  }
}
