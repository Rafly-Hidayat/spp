import axios from "axios";
import React, { Component } from "react";
import { Card, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swal } from "sweetalert2";

export default class ProfileSiswa extends Component {
  constructor(props) {
    super(props);

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
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios.get(`https://api-sps.my.id/profile/${id}`)
      .then((res) => {
        this.setState({
          siswa_nis: res.data[0].siswa_nis,
          siswa_nama: res.data[0].siswa_nama,
          siswa_gender: res.data[0].siswa_gender,
          kelas_nama: res.data[0].kelas_nama,
          jurusan_nama: res.data[0].jurusan_nama,
          d_kelas_nama: res.data[0].d_kelas_nama,
          gambar: res.data[0].siswa_img
        })
      })
  }
  render() {
    let gender = ""
    if (this.state.siswa_gender == "L") {
      gender += "Laki-laki"
    } else if (this.state.siswa_gender == "P") {
      gender += "Perempuan"
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
              <Row>
                <Col>
                  <img src={"https://api-sps.my.id/src/public/images/" + this.state.gambar} width={40} height={40} />
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
                      value={gender}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Kelas<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="kelas_nama"
                      value={this.state.kelas_nama + " " + this.state.jurusan_nama + " " + this.state.d_kelas_nama}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="outline-primary" type="submit">
                Tambah
              </Button>
              &ensp;
              <Link to="/user/profile">
                <Button variant="outline-danger" type="submit">
                  Batal
                </Button>
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}