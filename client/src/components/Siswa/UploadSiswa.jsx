import axios from "axios";
import React, { Component } from "react";
import { Card, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class UploadSiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedFile: null,
    };
    this.handleChange.bind(this);
    this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, selectedFile: e.target.files[0] }, () => {
      console.log(this.state.selectedFile);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "filename",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios
      .post("http://localhost:8000/siswa/upload", formData)
      .then((res) => {
        console.log(res.data);
        this.setState({
          selectedFile: null,
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
          this.props.history.push("/admin/siswa");
        }
      })
      .catch((err) => {
        console.log(err);
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
              <Breadcrumb.Item active>Upload</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Upload Siswa</Card.Title>
            <hr />
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>
                      Upload Siswa<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      type="file"
                      noValidate
                      onChange={this.handleChange}
                    />
                    <br />
                    <div>
                      <Button variant="outline-primary" type="submit">
                        Upload
                      </Button>
                      &ensp;
                      <Link to="/admin/siswa">
                        <Button variant="outline-danger" type="submit">
                          Batal
                        </Button>
                      </Link>
                    </div>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}