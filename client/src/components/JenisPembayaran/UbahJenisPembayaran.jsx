import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Card,
  InputGroup,
  FormSelect,
  Breadcrumb,
} from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class SetTarif extends Component {
  constructor(props) {
    super(props);
    document.title = "Jenis Pembayaran | Ubah";
    this.validator = new SimpleReactValidator();

    this.state = {
      pembayaran_id: this.props.match.params.id,
      data_tipe: [],
      tahun_ajaran: [],
      data_pos: [],
      tipe: "",
      periode: "",
      dataError: "",
      pos: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      pembayaran_tipe: this.state.tipe,
      periode_id: this.state.periode,
      pos_id: this.state.pos,
    };
    if (
      this.validator.allValid() &&
      this.state.tipe !== "" &&
      this.state.periode !== "" &&
      this.state.pos !== ""
    ) {
      axios
        .put(
          `https://api-sps.my.id/ubah/pembayaran/${this.state.pembayaran_id}`,
          data
        )
        .then((res) => {
          
          if (res.data.status === undefined) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil diubah",
            });
            this.props.history.push("/admin/jenis-pembayaran");
          } else {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Data gagal diubah",
            });
          }
        })
        .catch((err) => {
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

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios.get("https://api-sps.my.id/periode/").then((res) => {
      this.setState({ tahun_ajaran: res.data });
    });
    axios.get("https://api-sps.my.id/pembayaran/").then((res) => {
      this.setState({ data_tipe: res.data });
    });
    axios.get("https://api-sps.my.id/pos/").then((res) => {
      this.setState({ data_pos: res.data });
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
              <Breadcrumb.Item>
                <Link to="/admin">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/admin/jenispembayaran/">Data</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Ubah</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Ubah Pembayaran</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Jenis Pembayaran<span className="text-danger">*</span>
                </Form.Label>
                <FormSelect name="tipe" onChange={this.handleChange}>
                <option value="">=== Pilih Jenis Pembayaran ===</option>
                  <option value="BULANAN">BULANAN </option>
                  <option value="BEBAS">BEBAS </option>
                </FormSelect>
                <div>
                  {this.validator.message("tipe", this.state.tipe, `required`, {
                    className: "text-danger",
                    messages: {
                      required: "Pilih Jenis Pembayaran!",
                    },
                  })}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Tahun Ajaran<span className="text-danger">*</span>
                </Form.Label>
                <FormSelect name="periode" onChange={this.handleChange}>
                  <option value="">=== Pilih Tahun Ajaran ===</option>
                  {this.state.tahun_ajaran.map((periode) => {
                    return (
                      <option
                        key={periode.periode_id}
                        value={periode.periode_id}
                      >
                        {periode.periode_mulai}/{periode.periode_akhir}
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
                        required: "Pilih Tahun Ajaran!",
                      },
                    }
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Pos<span className="text-danger">*</span>
                </Form.Label>
                <FormSelect name="pos" onChange={this.handleChange}>
                  <option value="">=== Pilih Pos ===</option>
                  {this.state.data_pos.map((pos) => {
                    return (
                      <option key={pos.pos_id} value={pos.pos_id}>
                        {pos.pos_nama}
                      </option>
                    );
                  })}
                </FormSelect>
                <div>
                  {this.validator.message("pos", this.state.pos, `required`, {
                    className: "text-danger",
                    messages: {
                      required: "Pilih Pos!",
                    },
                  })}
                </div>
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Ubah
              </Button>
              &ensp;
              <Link to="/admin/jenis-pembayaran">
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
