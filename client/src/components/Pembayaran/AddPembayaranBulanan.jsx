import React, { Component } from "react";
import { Card, Form, FormSelect, Button } from "react-bootstrap";
import axios from "axios";

export default class AddPembayaranBulanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      admin: "",
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
    const id = this.state.id;
    const data = {
      admin_id : this.state.admin
    }
    axios
      .put(`http://localhost:8000/bulanan/bayar/${id}`, data)
      .then((res) => {
        this.props.history.push("/admin/pembayaran");
      });
  };
  render() {
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <Form onSubmit={this.Submit}>
              <Form.Group>
                <Form.Label>Admin</Form.Label>
                <FormSelect name="admin" onChange={this.handleChange}>
                  <option value="">Pilih Nama Admin</option>
                  <option value="1">Admin</option>
                  <option value="2">Admin2</option>
                </FormSelect>
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
