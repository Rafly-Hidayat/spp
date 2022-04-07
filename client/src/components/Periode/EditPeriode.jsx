import React, { Component } from "react";
import { Card, Form, Col, Button, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class Editperiode extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Ubah Periode";

    this.validator = new SimpleReactValidator();
    this.state = {
      id: this.props.match.params.id,
      periode_mulai: "",
      periode_akhir: "",
      periode_id: "",
    };
  }

  getData() {
    const periode_id = this.state.id;
    axios
      .get(`https://api-sps.my.id/periode/${periode_id}`)
      .then((res) => {
        this.setState({
          periode_id: res.data[0].periode_id,
          periode_mulai: res.data[0].periode_mulai,
          periode_akhir: res.data[0].periode_akhir,
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
      periode_mulai: this.state.periode_mulai,
      periode_akhir: this.state.periode_akhir,
    };
    const periode_id = this.state.periode_id;
    if (this.validator.allValid()) {
      axios
        .put(`https://api-sps.my.id/ubah/periode/${periode_id}`, data)
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
            <Card.Title>Ubah Periode</Card.Title>
          <Form onSubmit={this.editData}>
            <Form.Group className="mb-3">
            <hr />
              <Form.Label>Periode ID<span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="periode_id"
                id="periode_id"
                type="text"
                value={this.state.id}
                noValidate
                onChange={this.handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Periode Mulai<span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="periode_mulai"
                id="periode_mulai"
                type="text"
                value={this.state.periode_mulai}
                placeholder="Periode Awal"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.validator.message(
                  "Periode Mulai",
                  this.state.periode_mulai,
                  `required`,
                  { className: "text-danger",messages: {
                    required: "Masukkan Periode Awal!",
                  },}
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Periode Akhir<span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="periode_akhir"
                id="periode_akhir"
                type="text"
                value={this.state.periode_akhir}
                placeholder="Periode Akhir"
                noValidate
                onChange={this.handleChange}
              />
              <div>
                {this.validator.message(
                  "Periode Akhir",
                  this.state.periode_akhir,
                  `required`,
                  { className: "text-danger",messages: {
                    required: "Masukkan Periode Akhir!",
                  }, }
                )}
              </div>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Ubah
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
