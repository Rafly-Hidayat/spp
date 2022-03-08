import React, { Component } from "react";
import { Card, Form, FormSelect, Button, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default class AddPembayaranBulanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      admin: "",
      data: [],
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios.get("http://localhost:8000/admin").then((res) => {
      this.setState({
        data: res.data,
      });
      console.log(res);
    });
  }

  Submit = (e) => {
    e.preventDefault();
    const id = this.state.id;
    const data = {
      admin_id: this.state.admin,
    };
    axios.put(`http://localhost:8000/bulanan/bayar/${id}`, data).then((res) => {
      this.props.history.push("/admin/pembayaran");
    });
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
              <Breadcrumb.Item>
                <Link to="/admin/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/admin/siswa/">Data</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Add</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <Form onSubmit={this.Submit}>
              <Form.Group>
                <Form.Label>Admin</Form.Label>
                <FormSelect name="admin" onChange={this.handleChange}>
                  <option value="">Pilih Nama Admin</option>
                  {this.state.data.map((data) => {
                      return (
                        <option value={data.admin_id}>
                          {data.admin_nama}
                        </option>
                      );
                    })}
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
