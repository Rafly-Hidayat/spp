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
      password: "",
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
    
    this.setState({ uploadedFile: e.target.files[0] });
  };

  componentDidMount() {
    axios.get(`https://api-sps.my.id/profile/${this.state.id}`).then((res) => {
      const img = new File([res.data[0].siswa_img], "image.jpg");
      
      this.setState({
        siswa_nis: res.data[0].siswa_nis,
        siswa_nama: res.data[0].siswa_nama,
        siswa_gender: res.data[0].siswa_gender,
        kelas_nama: res.data[0].kelas_nama,
        d_kelas_nama: res.data[0].d_kelas_nama,
        jurusan_nama: res.data[0].jurusan_nama,
        gambar: res.data[0].siswa_img,
        uploadedFile: img,
        password: res.data[0].siswa_password,
      });
    });
  }
  editData = (e) => {
    e.preventDefault();
    // ambil data img dan password dari state
    const data = new FormData();
    data.append("password", this.state.password);
    data.append("img", this.state.uploadedFile);
    
    
    axios
      .put(`https://api-sps.my.id/profile/edit/${this.state.id}`, data)
      .then((res) => {
        
        if (res.data.error === true) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${res.data.message}`,
          });
        } else {
          
          this.props.history.push("/user/profile");
          Swal.fire({
            icon: "success",
            title: "Good Job!",
            text: `${res.data.message}`,
          });
        }
      });
  };
  render() {
    let gender = this.state.siswa_gender
    gender === 'P' ? gender = "Perempuan" : gender = "Laki-laki"

    if (this.state.gambar) {
      var imagestr = this.state.gambar;
      imagestr = imagestr.replace("src/public/image/", "");
      var profilePic = "https://api-sps.my.id/public/images/" + imagestr;
    } else {
      // profilePic = this.state.gambar;
      
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
              <Row >
                <Col md={2}>
                  <Form.Group className="mb-3">
                    <Form.Label>Foto Siswa<span className="text-danger">*</span></Form.Label>
                    <div
                      style={{
                        marginBottom: "12px",
                      }}
                    >
                      <img
                        src={
                          "https://api-sps.my.id/src/public/images/" +
                          this.state.gambar
                        }
                        width={160}
                        height={160}
                        style={{
                          display: "block",
                          margin: "0 auto",
                          borderRadius: "10px",
                          // border: "1px solid black",
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

                <Col md={5}>
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
                </Col>

                <Col md={5}>
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
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Password<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="password"
                      type="password"
                      value={this.state.password}
                      placeholder="Masukkan Password"
                      noValidate
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
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
      </div >
    );
  }
}
