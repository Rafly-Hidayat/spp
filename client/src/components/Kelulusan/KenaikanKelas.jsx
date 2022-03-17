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
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getKelas = () => {
    axios
      .get("http://localhost:8000/kelas/")
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
    axios.put("http://localhost:8000/kenaikan_kelas", data)
    .then((res) => {
      if (res.data.error === true) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${res.data.message}`,
        })
        this.setState({
          
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Good Job!",
          text: `${res.data.message}`,});
        this.props.history.push("/admin/kenaikan-kelas");
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  componentDidMount = () => {
    this.getKelas();
  };

  renderSelectedKelas(selected_kelas) {
    if (!selected_kelas) return console.log("");
    const siswa = DataSiswa[selected_kelas];
    console.log(selected_kelas);
    return <DataSiswa name={this.state.selected_kelas} />;
  }
  render() {
    const kelas = this.state.selected_ubah_kelas;
    if (kelas == "1") {
      kelas = "XI";
    } else if (kelas == "2") {
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
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
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
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Dari Kelas*
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
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Ke Kelas*
                      </Form.Label>
                    </Col>
                    <Col>
                      <FormSelect
                        name="selected_ubah_kelas"
                        onChange={this.handleChange}
                      >
                        <option value="">=== Pilih Kelas ===</option>
                        <option value="2">XI</option>
                        <option value="3">XII</option>
                      </FormSelect>
                      <div>
                        {this.validator.message(
                          "Kelas",
                          this.state.selected_ubah_kelas,
                          `required`,
                          {
                            className: "text-danger",
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <FormGroup>
                    <Col md="auto">
                      <Button type="submit">Ubah Kelas</Button>
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
