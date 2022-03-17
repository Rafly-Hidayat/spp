import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Form, FormSelect, Breadcrumb } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

export default class AddJenisPembayaran extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.state = {
      periodes: [],
      datapos: [],
      datapembayaran : [],
      jenispembayaran: "",
      periode: "",
      pos: "",
    };
  }

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
    if (this.validator.allValid() && this.state.jenispembayaran !== "" && this.state.periode !== "" && this.state.pos !== "") {
      axios
        .post("http://localhost:8000/tambah/pembayaran/", data)
        .then((res) => {
          if (res.data.status === undefined) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Jenis Pembayaran berhasil ditambahkan",
            });
            this.props.history.push("/admin/jenispembayaran");
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Jenis Pembayaran gagal ditambahkan",
            });
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal terhubung ke server",
          });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  componentDidMount() {
    axios.get("http://localhost:8000/periode/").then((res) => {
      this.setState({
        periodes: res.data,
      });
    });
    axios.get("http://localhost:8000/pos/").then((res) => {
      this.setState({
        datapos: res.data,
      });
    });
    axios.get("http://localhost:8000/pembayaran/").then((res) => {
      this.setState({
        datapembayaran: res.data,
      });
    });
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
              <Breadcrumb.Item><Link to="/admin">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/admin/jenispembayaran/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <Form onSubmit={this.Submit}>
              <Form.Group className="mb-3">
                <hr />
                <Form.Label>Jenis Pembayaran <span className="text-danger">*</span></Form.Label>
                <FormSelect name="jenispembayaran" onChange={this.handleChange}>
                  <option value="">Pilih Jenis Pembayaran </option>
                  {this.state.datapembayaran.map((item) => (
                    <option  value={item.pembayaran_tipe}>
                      {item.pembayaran_tipe}
                    </option>
                  ))}
                </FormSelect>
                <div>
                  {this.validator.message(
                    "jenispembayaran",
                    this.state.jenispembayaran,
                    `required`,
                    {
                      className: "text-danger",
                      messages: {
                        required: "Pilih Jenis Pembayaran!",
                      },
                    }
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tahun Ajaran <span className="text-danger">*</span></Form.Label>
                <FormSelect name="periode" onChange={this.handleChange}>
                  <option value="">Pilih Tahun Ajaran </option>
                  {this.state.periodes.map((item) => (
                    <option  value={item.periode_id}>
                      {item.periode_mulai}/{item.periode_akhir}
                    </option>
                  ))}
                </FormSelect>
                <div>
                  {this.validator.message(
                    "periode",
                    this.state.periode,
                    `required`,
                    {
                      className: "text-danger",
                      messages: {
                        required: "Pilih Tahun Ajaran!",
                      },
                    }
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Pos <span className="text-danger">*</span></Form.Label>
                <FormSelect name="pos" onChange={this.handleChange}>
                  <option value="">Pilih Pos</option>
                  {this.state.datapos.map((item) => (
                    <option  value={item.pos_id}>
                      {item.pos_nama}
                    </option>
                  ))}
                </FormSelect>
                <div>
                  {this.validator.message(
                    "pos",
                    this.state.pos,
                    `required`,
                    {
                      className: "text-danger",
                      messages: {
                        required: "Pilih Pos Pembayaran!",
                      },
                    }
                  )}
                </div>
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Tambah
              </Button>
              &ensp;
              <Link to="/admin/jenispembayaran">
                <Button variant="outline-danger" type="submit">
                  Batal
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
