import React, { Component } from "react";
import { Button, Row, Col, Form, Card, Breadcrumb } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class AddPeriode extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Tambah Periode";

    this.validator = new SimpleReactValidator();
    this.state = {
      periode_mulai: "",
      periode_akhir: "",
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
      periode_mulai: this.state.periode_mulai,
      periode_akhir: this.state.periode_akhir,
    };
    if (this.validator.allValid()) {
      axios
        .post("https://api-sps.my.id/tambah/periode", data)
        .then((res) => {
          this.setState({
            periode_mulai: "",
            periode_akhir: "",
          });
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
          }
          this.props.history.push("/admin/periode");
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
              <Breadcrumb.Item><Link to="/admin/periode/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br/>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Tambah Periode</Card.Title>
            <hr/>
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
              <Form.Label>Periode Awal<span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="periode_mulai"
                id="periode_mulai"
                type="number"
                maxlength={4}
                value={this.state.periode_mulai}
                placeholder="Periode Awal"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.validator.message(
                  "periode_mulai",
                  this.state.periode_mulai,
                  `required|min:0,num|numeric`,
                  { className: "text-danger",messages: {
                    required: "Masukkan Periode Awal!",
                  }, }
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Periode Akhir<span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="periode_akhir"
                id="periode_akhir"
                type="number"
                maxlength={4}
                value={this.state.periode_akhir}
                placeholder="Periode Akhir"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.validator.message(
                  "periode_akhir",
                  this.state.periode_akhir,
                  `required|min:0,num|numeric`,
                  { className: "text-danger",messages: {
                    required: "Masukkan Periode Akhir!",
                  }, }
                )}
              </div>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Tambah
            </Button>&ensp;
            <Link to="/admin/periode">
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
