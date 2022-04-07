import axios from "axios";
import React, { Component } from "react";
import { Card, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swal } from "sweetalert2";

export default class ProfileSiswa extends Component {
  constructor(props) {
    super(props);
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;

    this.state = {
      id: id,
      siswa_nis: "",
      siswa_gender: "",
      siswa_nama: "",
      kelas_nama: "",
      jurusan_nama: "",
      password: "",
      gambar: "",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    axios.get(`https://api-sps.my.id/profile/${this.state.id}`).then((res) => {
      this.setState({
        siswa_nis: res.data[0].siswa_nis,
        siswa_nama: res.data[0].siswa_nama,
        siswa_gender: res.data[0].siswa_gender,
        kelas_nama: res.data[0].kelas_nama,
        jurusan_nama: res.data[0].jurusan_nama,
        d_kelas_nama: res.data[0].d_kelas_nama,
        password: res.data[0].siswa_password,
        gambar: res.data[0].siswa_img,
      });
    });
  }
  render() {
    let gender = this.state.siswa_gender;
    if (this.state.siswa_gender == "L") {
      gender = "Laki-laki";
    } else if (this.state.siswa_gender == "P") {
      gender = "Perempuan";
    }

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
            <Form>
              <Row >
                <Col md={2}>
                  <div style={{
                    margin: "20px 0",
                  }}>

                    <img
                      src={
                        "https://api-sps.my.id/src/public/images/" + this.state.gambar
                      }
                      width={164}
                      height={164}
                      style={{
                        display: "block",
                        margin: "0 auto",
                        borderRadius: "10px",
                        // border: "1px solid black",
                      }}
                    />
                  </div>
                  <Link to="/user/profile/ubah"
                  style={{
                    textDecoration: "none",
                  }}>
                    <Button variant="outline-primary" type="submit"
                      style={{
                        display: "flex",
                        margin: "0 auto",
                      }}>
                      Ubah Profile
                    </Button>
                  </Link>
                  <br />
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      NIS<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="siswa_nis"
                      type="text"
                      value={this.state.siswa_nis}
                      placeholder="NIS"
                      onChange={this.handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Nama Siswa<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="siswa_nama"
                      id="nama"
                      type="text"
                      value={this.state.siswa_nama}
                      placeholder="Nama Siswa"
                      noValidate
                      onChange={this.handleChange}
                      readOnly
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Password<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="password"
                      id="password"
                      type="password"
                      value={this.state.password}
                      placeholder="Masukkan Password"
                      noValidate
                      onChange={this.handleChange}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Jenis Kelamin
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="siswa_gender"
                      value={gender}
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
                        this.state.kelas_nama +
                        " " +
                        this.state.jurusan_nama +
                        " " +
                        this.state.d_kelas_nama
                      }
                      onChange={this.handleChange}
                      readOnly
                    ></Form.Control>
                  </Form.Group>

                </Col>
              </Row>

            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
