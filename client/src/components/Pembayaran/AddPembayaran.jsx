import React, { Component } from "react";
import { Button, Row, Col, Form, Card } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import {Link} from 'react-router-dom'

export default class AddPembayaran extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      id: this.props.match.params.id,
      nominal: "",
      keterangan: "",
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
      nominal: this.state.nominal,
      keterangan: this.state.keterangan,
    };
    if (this.validator.allValid()) {
      axios
        .post(`http://localhost:8000/bebas/bayar/${this.state.id}`, data)
        .then((res) => {
          console.log(res)
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: `${res.data.message}`,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: `Pembayaran Berhasil!`,
            })
            this.props.history.push("/admin/pembayaran");
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
      <Card style={{ color: "black" }}>
        <Card.Body>
          <Card.Title>Pembayaran</Card.Title>
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                name="nominal"
                id="nominal"
                onChange={this.handleChange}
                noValidate
                value={this.state.nominal}
              />
              <div>
                {this.validator.message("nominal", this.state.nominal, `required`, {
                  className: "text-danger",
                  messages: {
                    required: "Masukkan Nominal yang ingin dibayarkan!",
                  },
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                name="keterangan"
                id="keterangan"
                onChange={this.handleChange}
                noValidate
                value={this.state.keterangan}
              />
              <div>
                {this.validator.message("keterangan", this.state.keterangan, `required`, {
                  className: "text-danger",
                  messages: {
                    required: "Masukkan keterangan!",
                  },
                })}
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Bayar
            </Button>
            &ensp;
              <Link to="/admin/pembayaran">
                <Button variant="outline-danger" type="submit">
                  Batal
                </Button>
              </Link>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
