import axios from "axios";
import React, { Component } from "react";
import { Card, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default class UploadBulanan extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Upload Bulanan";

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
      
    });
  };

  handleSubmit = (e) => {
    if (!this.state.selectedFile) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan Masukkan File!",
      });
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "filename",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    axios
      .post("https://api-sps.my.id/bulanan/upload", formData)
      .then((res) => {
        
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
          this.props.history.push("/admin/jenispembayaran");
        }
      })
      .catch((err) => {
        
      });
  };
  resetFile() {
    // Reset file input control
    document.getElementsByName("filename")[0].value = null;
  }
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
                <Link to="/admin/jenispembayaran/">Data</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Upload</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Upload Bulanan</Card.Title>
            <hr />
            <Row>
              <Col>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>
                      Upload Bulanan<span className="text-danger">*</span>
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
                      <Link to="/admin/jenispembayaran">
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
