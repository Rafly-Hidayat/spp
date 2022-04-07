import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Form,
  Card,
  FormSelect,
  FormCheck,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default class TambahSiswa extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Tambah Siswa";
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.state = {
      nis: "",
      nama: "",
      gender: "",
      kelas: [],
      jurusan: [],
      d_kelas: [],
      dataError: "",
      selected_kelas: "",
      selected_jurusan: "",
      selected_d_kelas: "",
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getKelas = () => {
    axios
      .get("https://api-sps.my.id/kelas/")
      .then((res) => {
        this.setState({
          kelas: res.data,
        });
      })
      .catch((err) => {});
  };
  getJurusan = () => {
    axios
      .get("https://api-sps.my.id/jurusan/")
      .then((res) => {
        this.setState({
          jurusan: res.data,
        });
      })
      .catch((err) => {});
  };
  getDKelas = () => {
    axios
      .get("https://api-sps.my.id/d_kelas/")
      .then((res) => {
        this.setState({
          d_kelas: res.data,
        });
      })
      .catch((err) => {});
  };

  componentDidMount() {
    this.getKelas();
    this.getJurusan();
    this.getDKelas();
  }

  Submit = (e) => {
    e.preventDefault();
    const data = {
      nis: this.state.nis,
      nama: this.state.nama,
      gender: this.state.gender,
      kelas: this.state.selected_kelas,
      jurusan: this.state.selected_jurusan,
      d_kelas: this.state.selected_d_kelas,
      selected_kelas: this.selected_kelas,
      selected_jurusan: this.selected_jurusan,
      selected_d_kelas: this.selected_d_kelas,
    };
    e.preventDefault();
    if (
      this.validator.allValid() &&
      this.state.selected_jurusan !== "" &&
      this.state.gender !== "" &&
      this.state.selected_d_kelas !== "" &&
      this.state.selected_kelas !== ""
    ) {
      axios
        .post("https://api-sps.my.id/tambah/siswa", data)
        .then((res) => {
          

          if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res.data.message}`,
            });
            this.setState({
              nis: "",
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
        .catch((err) => {});
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
        <br/>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Tambah Siswa</Card.Title>
            <hr />
            {/* <Sidebar /> */}
            <Form onSubmit={this.Submit}>
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
                      value={this.state.nis}
                      placeholder="NIS"
                      noValidate
                      onChange={this.handleChange}
                    />
                    <div>
                      {this.validator.message(
                        "nis",
                        this.state.nis,
                        `required`,
                        {
                          className: "text-danger",
                          messages: {
                            required: "Masukkan NIS Siswa!",
                          },
                        }
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Nama Siswa<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      name="nama"
                      id="nama"
                      type="text"
                      value={this.state.nama}
                      placeholder="Nama Siswa"
                      noValidate
                      onChange={this.handleChange}
                    />
                    <div>
                      {this.validator.message(
                        "nama",
                        this.state.nama,
                        `required`,
                        {
                          className: "text-danger",
                          messages: {
                            required: "Masukkan Nama Siswa!",
                          },
                        }
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Jenis Kelamin
                      <span className="text-danger">*</span>
                    </Form.Label>
                    <FormSelect name="gender" onChange={this.handleChange}>
                      <option value="">=== Pilih Jenis Kelamin ===</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </FormSelect>
                    <div>
                      {this.validator.message(
                        "gender",
                        this.state.gender,
                        `required`,
                        {
                          className: "text-danger",
                          messages: {
                            required: "Pilih Jenis Kelamin!",
                          },
                        }
                      )}
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Kelas<span className="text-danger">*</span>
                    </Form.Label>
                    <FormSelect
                      name="selected_kelas"
                      onChange={this.handleChange}
                    >
                      <option value="">=== Pilih Kelas ===</option>
                      {this.state.kelas.map((kelas) => {
                        return (
                          <option key={kelas.kelas_id} value={kelas.kelas_id}>
                            {kelas.kelas_nama}
                          </option>
                        );
                      })}
                    </FormSelect>
                    <div>
                      {this.validator.message(
                        "Kelas",
                        this.state.selected_kelas,
                        `required`,
                        {
                          className: "text-danger",
                          messages: {
                            required: "Pilih Kelas Siswa!",
                          },
                        }
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Jurusan<span className="text-danger">*</span>
                    </Form.Label>
                    <FormSelect
                      name="selected_jurusan"
                      onChange={this.handleChange}
                    >
                      <option value="">=== Pilih Jurusan ===</option>
                      {this.state.jurusan.map((jurusan) => {
                        return (
                          <option
                            key={jurusan.jurusan_id}
                            value={jurusan.jurusan_id}
                          >
                            {jurusan.jurusan_nama}
                          </option>
                        );
                      })}
                    </FormSelect>
                    <div>
                      {this.validator.message(
                        "Jurusan",
                        this.state.selected_jurusan,
                        `required`,
                        {
                          className: "text-danger",
                          messages: {
                            required: "Pilih Jurusan Siswa!",
                          },
                        }
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Daftar Kelas<span className="text-danger">*</span>
                    </Form.Label>
                    <FormSelect
                      name="selected_d_kelas"
                      onChange={this.handleChange}
                    >
                      <option value="">=== Pilih Daftar Kelas ===</option>
                      {this.state.d_kelas.map((d_kelas) => {
                        return (
                          <option
                            key={d_kelas.d_kelas_id}
                            value={d_kelas.d_kelas_id}
                          >
                            {d_kelas.d_kelas_nama}
                          </option>
                        );
                      })}
                    </FormSelect>
                    <div>
                      {this.validator.message(
                        "Daftar Kelas",
                        this.state.selected_d_kelas,
                        `required`,
                        {
                          className: "text-danger",
                          messages: {
                            required: "Pilih Daftar Kelas!",
                          },
                        }
                      )}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="outline-primary" type="submit">
                Tambah
              </Button>
              &ensp;
              <Link to="/admin/siswa">
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
