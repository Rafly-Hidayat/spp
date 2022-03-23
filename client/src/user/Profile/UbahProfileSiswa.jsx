import React, { Component } from "react";
import { Card, Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default class UbahProfileSiswa extends Component {
  constructor(props) {
    super(props);
    document.title = "Siswa | Ubah Profile";
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    this.state = {
      id: id,
      siswa_nis: "",
      siswa_gender: "",
      siswa_nama: "",
      kelas_nama: "",
      jurusan_nama: "",
      gambar: "",
      uploadedFile: null,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  imageHandler = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState({ uploadedFile: e.target.files[0] });
  };

  componentDidMount() {
    axios.get(`http://localhost:8000/profile/${this.state.id}`).then((res) => {
      console.log(res);
      this.setState({
        siswa_nis: res.data[0].siswa_nis,
        siswa_nama: res.data[0].siswa_nama,
        siswa_gender: res.data[0].siswa_gender,
        kelas_nama: res.data[0].kelas_nama,
        d_kelas_nama: res.data[0].d_kelas_nama,
        jurusan_nama: res.data[0].jurusan_nama,
        gambar: res.data[0].siswa_img,
      });
    });
  }
  editData = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", this.state.uploadedFile);
    console.log(formData);
    axios
      .post(`http://localhost:8000/profile/edit/${this.state.id}`, formData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
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
      });
  };
  render() {

    let gender = "";
    if (this.state.siswa_gender === "L") {
      gender += "Laki-laki";
    } else if (this.state.siswa_gender === "P") {
      gender += "Perempuan";
    }

    if (this.state.gambar) {
      var imagestr = this.state.gambar;
      imagestr = imagestr.replace("public/image/", "");
      var profilePic = "http://localhost:8000/public/images/" + imagestr;
    } else {
      // profilePic = this.state.gambar;
      console.log("else condition");
    }
    console.log(profilePic);
    console.log(this.state.uploadedFile);
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
              <Breadcrumb.Item>
                <Link to="/user/profile">Profile</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Ubah</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Ubah Profile</Card.Title>
            <hr />
            <Form onSubmit={this.editData}>
              <Row xs={2} md={8} lg={1}>
                <Col>
                  <Form.Group className="mb-3">
                      <Form.Label>Foto Siswa<span className="text-danger">*</span></Form.Label>
                    <div
                     style={{
                      marginBottom: "29px",
                    
                    }}
                    >
                      <img
                        src={
                          "http://localhost:8000/public/images/" +
                          this.state.gambar
                        }
                        width={90}
                        height={90}
                        style={{
                          display: "flex",
                          borderRadius: "10px",
                          border: "1px solid black",
                        }}
                      />
                    </div>
                    <Form.Control
                    style={{
                      marginTop: "1px",
                      display: "flex",
                    }}
                      name="img"
                      accept="image/*"
                      type="file"
                      onChange={this.imageHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      NIS<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="siswa_nis"
                      id="siswa_nis"
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
                      name="siswa_nama"
                      id="siswa_nama"
                      type="text"
                      value={this.state.siswa_nama}
                      placeholder="Nama Siswa"
                      noValidate
                      onChange={this.handleChange}
                      readOnly
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
                      name="siswa_gender"
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
