import React, { Component } from "react";
import { Button, Row, Col, Form, Card, Breadcrumb } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Tambahkelas extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      kelas_nama: "",
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
      kelas_nama: this.state.kelas_nama,
    };
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/tambah/kelas", data)
        .then((res) => {
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
          } else {
            this.props.history.push("/admin/kelas");
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
              <Breadcrumb.Item><Link to="/admin/kelas/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br/>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Tambah Kelas</Card.Title>
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
            <hr />
              <Form.Label>Nama Kelas*</Form.Label>
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
            <Link to="/admin/kelas">
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
