import React, { Component } from "react";
import { Card, Form, Col, Button, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class UbahKelas extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      id: this.props.match.params.id,
      kelas_nama: "",
      kelas_id: "",
      dataError: "",
      errorMessage: "",
    };
  }

  getData() {
    const kelas_id = this.state.id;
    axios
      .get(`http://localhost:8000/kelas/${kelas_id}`)
      .then((res) => {
        this.setState({
          kelas_id: res.data[0].kelas_id,
          kelas_nama: res.data[0].kelas_nama,
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
      kelas_nama: this.state.kelas_nama,
    };
    const kelas_id = this.state.kelas_id;
    if (this.validator.allValid()) {
      axios
        .put(`http://localhost:8000/ubah/kelas/${kelas_id}`, data)
        .then((res) => {
          this.setState({
            kelas_nama: "",
          });
          this.props.history.push("/admin/kelas");
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
              <Breadcrumb.Item><Link to="/admin/kelas/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Ubah Kelas</Card.Title>
          <Form onSubmit={this.editData}>
            <Form.Group className="mb-3">
            <hr />
              <Form.Label>ID Kelas*</Form.Label>
              <Form.Control
                name="kelas_id"
                id="kelas_id"
                type="text"
                value={this.state.kelas_id}
                placeholder="ID Kelas"
                noValidate
                onChange={this.handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
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
                  "Nama kelas",
                  this.state.kelas_nama,
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
