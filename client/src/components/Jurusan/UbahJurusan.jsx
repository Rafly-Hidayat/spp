import React, { Component } from "react";
import { Card, Form, Col, Button, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Breadcrumb } from "react-bootstrap";

export default class UbahJurusan extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      id: this.props.match.params.id,
      jurusan_nama: "",
      jurusan_id: "",
      dataError: "",
      errorMessage: "",
    };
  }

  getData() {
    const jurusan_id = this.state.id;
    axios
      .get(`http://localhost:8000/jurusan/${jurusan_id}`)
      .then((res) => {
        this.setState({
          jurusan_id: res.data[0].jurusan_id,
          jurusan_nama: res.data[0].jurusan_nama,
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
      jurusan_nama: this.state.jurusan_nama,
    };
    const jurusan_id = this.state.jurusan_id;
    if (this.validator.allValid()) {
      axios
        .put(`http://localhost:8000/ubah/jurusan/${jurusan_id}`, data)
        .then((res) => {
          this.setState({
            jurusan_nama: "",
          });
          this.props.history.push("/admin/jurusan");
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
              <Breadcrumb.Item><Link to="/admin">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/admin/jurusan/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Form.Group className="mb-3">
            <Card.Title> Ubah Jurusan</Card.Title>
            <hr />
          <Form onSubmit={this.editData}>
            <Form.Group className="mb-3">
              <Form.Label>Id jurusan*</Form.Label>
              <Form.Control
                name="jurusan_id"
                id="jurusan_id"
                type="text"
                value={this.state.jurusan_id}
                placeholder="Id jurusan"
                noValidate
                onChange={this.handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Jurusan*</Form.Label>
              <Form.Control
                name="jurusan_nama"
                id="jurusan_nama"
                type="text"
                value={this.state.jurusan_nama}
                placeholder="Nama Jurusan"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "Nama Jurusan",
                  this.state.jurusan_nama,
                  `required`,
                  { className: "text-danger" }
                )}
              </div>
            </Form.Group>
            <Row>
            <Col md={1}>
            <Button variant="outline-primary" type="submit">
              Ubah
            </Button>
            </Col>
            <Col md={3}>
            <Link to="/admin/jurusan">
              <Button variant="outline-danger" type="submit">Batal
            </Button>
            </Link>
            </Col>
            </Row>
          </Form>
          </Form.Group>
          </Card.Body>
          </Card>
        </div>
    );
  }
}
