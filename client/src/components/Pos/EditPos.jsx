import React, { Component } from "react";
import { Card, Form, Col, Button, Row, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class EditPos extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Ubah Pos";
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
      .get(`https://api-sps.my.id/pos/${pos_id}`)
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
        .put(`https://api-sps.my.id/ubah/pos/${pos_id}`, data)
        .then((res) => {
          this.setState({
            pos_nama: "",
            pos_deskripsi: "",
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
              <Form.Label>Pos Id<span className="text-danger">*</span></Form.Label>
              <Form.Control
                name="pos_id"
                id="pos_id"
                type="text"
                value={this.state.pos_id}
                placeholder="Id pos"
                noValidate
                onChange={this.handleChange}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Pos<span className="text-danger">*</span></Form.Label>
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
                {this.validator.message(
                  "Nama Pos",
                  this.state.pos_nama,
                  `required`,
                  { className: "text-danger",messages: {
                    required: "Masukkan Nama Pos!",
                  }, }
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pos Deskripsi<span className="text-danger">*</span></Form.Label>
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
                {this.validator.message(
                  "pos_deskripsi",
                  this.state.pos_deskripsi,
                  `required`,
                  { className: "text-danger",messages: {
                    required: "Masukkan Pos Deskripsi!",
                  }, }
                )}
              </div>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Ubah
            </Button>&ensp;
            <Link to="/admin/pos">
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
