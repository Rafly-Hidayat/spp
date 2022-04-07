import React, { Component } from "react";
import { Card, Form, Col, Button, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Breadcrumb } from "react-bootstrap";
import Swal from "sweetalert2";

export default class UbahDaftarKelas extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    document.title = "Daftar Kelas | Ubah";
    this.state = {
      id: this.props.match.params.id,
      d_kelas_nama: "",
      d_kelas_id: "",
      dataError: "",
      errorMessage: "",
    };
  }

  getData() {
    const d_kelas_id = this.state.id;
    axios
      .get(`https://api-sps.my.id/d_kelas/${d_kelas_id}`)
      .then((res) => {
          
        this.setState({
          d_kelas_id: res.data[0].d_kelas_id,
          d_kelas_nama: res.data[0].d_kelas_nama,
        });
      })
      .catch((err) => {});
  }

  componentDidMount() {
    this.getData();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  editData = (e) => {
    e.preventDefault();
    const data = {
      d_kelas_nama: this.state.d_kelas_nama,
    };
    const d_kelas_id = this.state.d_kelas_id;
    if (this.validator.allValid()) {
      axios
        .put(`https://api-sps.my.id/ubah/d_kelas/${d_kelas_id}`, data)
        .then((res) => {
          if (res.data.error === true ) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res.data.message}`,
            });
            this.setState({
              d_kelas_nama: "",
            });
          } else {
            Swal.fire({
            icon: "success",
            title: "Good Job!",
            text: `${res.data.message}`,});
          }
          this.props.history.push("/admin/daftar-kelas");
        })
        .catch((err) => {});
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

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
                <Link to="/admin/d-kelas/">Data</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Form.Group className="mb-3">
              <Card.Title> Ubah Daftar Kelas</Card.Title>
              <hr />
              <Form onSubmit={this.editData}>
                <Form.Group className="mb-3">
                  <Form.Label>Id Daftar Kelas*</Form.Label>
                  <Form.Control
                    name="d_kelas_id"
                    id="d_kelas_id"
                    type="text"
                    value={this.state.d_kelas_id}
                    placeholder="ID Daftar Kelas"
                    noValidate
                    onChange={this.handleChange}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Daftar Kelas*</Form.Label>
                  <Form.Control
                    name="d_kelas_nama"
                    id="d_kelas_nama"
                    type="text"
                    value={this.state.d_kelas_nama}
                    placeholder="Nama Daftar Kelas"
                    noValidate
                    onChange={this.handleChange}
                  />
                  <div>
                    {this.state.dataError ? (
                      <div style={{ color: "red" }}>
                        {this.state.errorMessage}
                      </div>
                    ) : null}
                    {this.validator.message(
                      "d_kelas_nama",
                      this.state.d_kelas_nama,
                      `required`,
                      {
                        className: "text-danger",
                        messages: {
                          required: "Masukkan Nama Daftar Kelas!",
                        },
                      }
                    )}
                  </div>
                </Form.Group>
                    <Button variant="outline-primary" type="submit">
                      Ubah
                    </Button>&ensp;
                    <Link to="/admin/daftar-kelas">
                      <Button variant="outline-danger" type="submit">
                        Batal
                      </Button>
                    </Link>
              </Form>
            </Form.Group>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
