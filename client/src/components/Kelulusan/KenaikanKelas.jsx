import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  FormSelect,
  Card,
  Form,
  Breadcrumb,
  Button,
  FormGroup,
} from "react-bootstrap";
import DataSiswa from "./DataSiswa";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

export default class KenaikanKelas extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Kenaikan Kelas";
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      data: [],
      selected_kelas: "",
      selected_ubah_kelas: "",
      kelas: [],
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === "selected_kelas") {
      if (e.target.value === "") {
        this.setState({
          selected_ubah_kelas: "",
        });
      }
      if (e.target.value === "1") {
        this.setState({
          selected_ubah_kelas: "2",
        });
      } else if (e.target.value === "2") {
        this.setState({
          selected_ubah_kelas: "3",
        });
      }
    }
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

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kelas: this.state.selected_kelas,
      ke_kelas: this.state.selected_ubah_kelas,
    };
    if (this.validator.allValid()) {
      axios
        .put("https://api-sps.my.id/kenaikan_kelas", data)
        .then((res) => {
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
            this.props.history.push("/admin/kenaikan-kelas");
          }
          
        })
        .catch((err) => {
          
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };

  componentDidMount = () => {
    this.getKelas();
    document.title = "Admin | Kenaikan Kelas";
  };

  renderSelectedKelas(selected_kelas) {
    if (!selected_kelas) return 
    const siswa = DataSiswa[selected_kelas];
    
    return <DataSiswa name={this.state.selected_kelas} />;
  }
  render() {

    let kelas = this.state.selected_ubah_kelas;
    if (kelas == "2") {
      kelas = "XI";
    } else if (kelas == "3") {
      kelas = "XII";
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
                <Link to="/admin/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Kenaikan Kelas</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Kenaikan Kelas</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col xs={3} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Dari Kelas<span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <FormSelect
                        name="selected_kelas"
                        onChange={this.handleChange}
                      >
                        <option value="">=== Pilih Kelas ===</option>
                        <option value="1">X</option>
                        <option value="2">XI</option>
                      </FormSelect>
                      <div>
                        {this.validator.message(
                          "Kelas",
                          this.state.selected_kelas,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih Kelas Yang Ingin Di Naikan!",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Ke Kelas<span className="text-danger">*</span>
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        name="selected_ubah_kelas"
                        id="selected_ubah_kelas"
                        type="text"
                        value={kelas}
                        placeholder="Auto Fill"
                        noValidate
                        disabled
                      />
                      <div>
                        {this.validator.message(
                          "Kelas",
                          this.state.selected_ubah_kelas,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih Kelas Yang Ingin Di Naikan!",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                  <FormGroup>
                    <Col>
                      <Button variant="outline-primary" type="submit">Ubah Kelas</Button>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        {this.renderSelectedKelas(this.state.selected_kelas)}
      </div>
    );
  }
}
