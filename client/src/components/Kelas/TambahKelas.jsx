import React, { Component } from "react";
import { Button, Row, Col, Form, Card, Breadcrumb } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class Tambahkelas extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Tambah Kelas";
    this.validator = new SimpleReactValidator();
    this.state = {
      kelas_nama: "",
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
      kelas_nama: this.state.kelas_nama,
    };
    if (this.validator.allValid()) {
      axios
        .post("https://api-sps.my.id/tambah/kelas", data)
        .then((res) => {
          this.setState({});
          
          if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res.data.message}`,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Good Job!",
              text: `${res.data.message}`,
            });
            this.props.history.push("/admin/kelas");
          }
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
                <Link to="/admin/kelas/">Data</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Tambah Kelas</Card.Title>
            <Form onSubmit={this.Submit}>
              <Form.Group className="mb-3">
                <hr />
                <Form.Label>
                  Nama Kelas<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="kelas_nama"
                  id="kelas_nama"
                  type="text"
                  value={this.state.kelas_nama}
                  placeholder="Nama Kelas"
                  noValidate
                  onChange={this.handleChange}
                />
                <div>
                  {this.validator.message(
                    "kelas_nama",
                    this.state.kelas_nama,
                    `required`,
                    {
                      className: "text-danger",
                      messages: {
                        required: "Masukkan Nama Kelas!",
                      },
                    }
                  )}
                </div>
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Tambah
              </Button>
              &ensp;
              <Link to="/admin/kelas">
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
