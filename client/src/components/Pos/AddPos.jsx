import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Form, Card, Breadcrumb, } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

export default class AddPos extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      pos_nama: "",
      pos_deskripsi: "",
      dataError: "",
      errorMessage: "",
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
      pos_nama: this.state.pos_nama,
      pos_deskripsi: this.state.pos_deskripsi,
    };
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/tambah/pos", data)
        .then((res) => {
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
          } else {
            this.props.history.push("/admin/pos");
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
              <Breadcrumb.Item><Link to="/admin/pos/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br/>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Tambah Pos</Card.Title>
            <hr/>
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Pos*</Form.Label>
              <Form.Control
                name="pos_nama"
                id="pos_nama"
                type="text"
                value={this.state.pos_nama}
                placeholder="Nama pos"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "pos_nama",
                  this.state.pos_nama,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pos Deskripsi*</Form.Label>
              <Form.Control
                name="pos_deskripsi"
                id="pos_deskripsi"
                type="text"
                value={this.state.pos_deskripsi}
                placeholder="Pos Deskripsi"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "pos_deskripsi",
                  this.state.pos_deskripsi,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>
            <Row>
            <Col md={1}>
            <Button variant="outline-primary" type="submit">
              Tambah
            </Button>
            </Col>
            <Col>
            <Link to="/admin/pos">
              <Button variant="outline-danger" type="submit">Batal
            </Button>
            </Link>
            </Col>
            </Row>
          </Form>
          </Card.Body>
          </Card>
        </div>
    );
  }
}
