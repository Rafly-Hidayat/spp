import React, { Component } from "react";
import { Card, Form, Col, Button, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class EditPos extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      id: this.props.match.params.id,
      pos_nama: "",
      pos_deskripsi: "",
      pos_id: "",
      dataError: "",
      errorMessage: "",
    };
  }

  getData() {
    const pos_id = this.state.id;
    axios
      .get(`http://localhost:8000/pos/${pos_id}`)
      .then((res) => {
        this.setState({
          pos_id: res.data[0].pos_id,
          pos_nama: res.data[0].pos_nama,
          pos_deskripsi: res.data[0].pos_deskripsi,
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
      pos_nama: this.state.pos_nama,
      pos_deskripsi: this.state.pos_deskripsi,
    };
    const pos_id = this.state.pos_id;
    if (this.validator.allValid()) {
      axios
        .put(`http://localhost:8000/ubah/pos/${pos_id}`, data)
        .then((res) => {
          this.setState({
            pos_nama: "",
            pos_deskripsi: "",
          });
          this.props.history.push("/admin/pos");
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
              <Breadcrumb.Item><Link to="/admin/pos/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Ubah Pos</Card.Title>
          <Form onSubmit={this.editData}>
            <Form.Group className="mb-3">
            <hr />
              <Form.Label>ID Pos*</Form.Label>
              <Form.Control
                name="pos_id"
                id="pos_id"
                type="text"
                value={this.state.pos_id}
                placeholder="Id pos"
                noValidate
                onChange={this.handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Pos*</Form.Label>
              <Form.Control
                name="pos_nama"
                id="pos_nama"
                type="text"
                value={this.state.pos_nama}
                placeholder="Nama Pos"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.state.dataError ? (
                  <div style={{ color: "red" }}>{this.state.errorMessage}</div>
                ) : null}
                {this.validator.message(
                  "Nama Pos",
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
                placeholder="Nama pos"
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
              Ubah
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
