import React, { Component } from "react";
import { Card, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default class UbahProfileSiswa extends Component {
  constructor(props) {
    super(props);
    document.title = "Siswa | Ubah Profile";

    this.state = {
      siswa_nis: "",
      siswa_gender: "",
      siswa_nama: "",
      kelas_nama: "",
      jurusan_nama: "",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    const siswa_id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios.get(`http://localhost:8000/profile/${siswa_id}`).then((res) => {
      console.log(res);
      this.setState({
        siswa_nis: res.data[0].siswa_nis,
        siswa_nama: res.data[0].siswa_nama,
        siswa_gender: res.data[0].siswa_gender,
        kelas_nama: res.data[0].kelas_nama,
        jurusan_nama: res.data[0].jurusan_nama,
      });
    });
  }

  editData = (e) => {
    e.preventDefault();
    const data = {
      siswa_nis: this.state.siswa_nis,
      siswa_gender: this.state.siswa_gender,
      siswa_nama: this.state.siswa_nama,
      kelas_nama: this.state.kelas_nama,
      jurusan_nama: this.state.jurusan_nama,
    };
    const siswa_id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios
      .put(`http://localhost/profile/edit/${siswa_id}`, data)
      .then((res) => {
        console.log(res);
        this.setState({
          siswa_nis: "",
          siswa_gender: "",
          siswa_nama: "",
          kelas_nama: "",
          jurusan_nama: "",
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
        this.props.history.push("/user/profile");
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
                <Link to="/user/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <hr />
            <Form onSubmit={this.editData}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      NIS<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="nis"
                      id="nis"
                      type="text"
                      value={this.state.siswa_nis}
                      placeholder="NIS"
                      noValidate
                      onChange={this.handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Nama Siswa<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="nama"
                      id="nama"
                      type="text"
                      value={this.state.siswa_nama}
                      placeholder="Nama Siswa"
                      noValidate
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Jenis Kelamin
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="gender"
                      value={this.state.siswa_gender}
                      onChange={this.handleChange}
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Kelas<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="kelas_nama"
                      value={
                        this.state.kelas_nama + " " + this.state.jurusan_nama
                      }
                      onChange={this.handleChange}
                      readOnly
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="outline-primary" type="submit">
                Ubah Profile
              </Button>
              &ensp;
              <Link to="/user/profile/">
                <Button variant="outline-danger" type="submit">
                  Kembali
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
