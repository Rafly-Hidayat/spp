import React, { Component } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class TambahDaftarKelas extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    document.title = "Daftar Kelas | Tambah";
    this.state = {
      d_kelas_nama: "",
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();
    const data = {
      d_kelas_nama: this.state.d_kelas_nama,
    };
    if (this.validator.allValid())  {
      axios
        .post("https://api-sps.my.id/tambah/d_kelas", data)
        .then((res) => {
          
          if (res.data.error === true ) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res.data.message}`,
            });
          } else {
            Swal.fire({
            icon: "success",
            title: "Good Job!",
            text: `${res.data.message}`,});
            this.props.history.push("/admin/daftar-kelas");
          }
        })
        .catch((error) => {});
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
              <Breadcrumb.Item><Link to="/admin">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/admin/d-kelas/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Tambah Daftar Kelas</Card.Title>
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
            <hr />
            <Form.Label>Nama Daftar Kelas<span className="text-danger">*</span></Form.Label>
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
                {this.validator.message(
                  "d_kelas_nama",
                  this.state.d_kelas_nama,
                  `required`,
                  { className: "text-danger",
                  messages : {
                    required: 'Masukkan Nama Daftar Kelas!',
                  } 
                }
                )}
              </div>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Tambah
            </Button>&ensp;
            <Link to="/admin/daftar-kelas">
              <Button variant="outline-danger" type="submit">Batal
            </Button>
            </Link>
          </Form>
          </Card.Body>
          </Card>
        </div>
    );
  }
}
