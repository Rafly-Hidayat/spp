import React, { Component } from "react";
import { Button, Row, Col, Form, Card, Breadcrumb } from "react-bootstrap";
import {Link} from 'react-router-dom'
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

export default class AddPembayaran extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
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
          console.log(res);
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
          } else {
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
      <div>
        <Card>
          <Card.Body>
            <Breadcrumb
              style={{
                marginTop: "-10px",
                marginBottom: "-22px",
              }}
            >
              <Breadcrumb.Item><Link to="/admin/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/admin/siswa/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
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
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
