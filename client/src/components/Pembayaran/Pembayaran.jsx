import React, { Component } from "react";
import { Button, Card, Col, Form, FormSelect, Row, Breadcrumb } from "react-bootstrap";
import {Link} from 'react-router-dom'
import InformasiSIswa from "./InformasiSIswa";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Swal from 'sweetalert2'

export default class Pembayaran extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    this.state = {
      visible: false,
      data: [],
      nis: "",
      periode: "",
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validator.allValid()) {
      axios.get(`http://localhost:8000/siswa_nis/${this.state.nis}`).then((res) => {
        console.log(res.data[0])
        if(res.data[0] === undefined){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'NIS Siswa tidak ditemukan!',
          })
        }else{
          this.setState({
            visible: true,
          })
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Gagal terhubung ke server!',
        })
      })
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/periode`).then((res) => {
      this.setState({
        data: res.data, 
      });
    });
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
              <Breadcrumb.Item><Link to="/admin/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br/>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <hr/>
            <Form
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Tahun Ajaran
                    </Form.Label>
                    <Col>
                      <FormSelect name="periode" onChange={this.handleChange}>
                        <option>Pilih Tahun Ajaran</option>
                        {this.state.data.map((item) => {
                          return (
                            <option value={item.id}>
                              {item.periode_mulai}/{item.periode_akhir}
                            </option>
                          );
                        })}
                      </FormSelect>
                      <div>
                        {this.validator.message('periode', this.state.periode, `required`, {
                          className: 'text-danger',
                          messages : {
                            required: 'Pilih tahun ajaran!',
                          }
                        })}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Cari Siswa
                    </Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        placeholder="NIS Siswa"
                        name="nis"
                        value={this.state.nis}
                        onChange={this.handleChange}
                      />
                      <div>
                        {this.validator.message("nis", this.state.nis, `required`, { className:"text-danger",
                          messages: {
                            required: "Masukkan NIS Siswa!",
                            int : "NIS Siswa harus berupa angka!"
                        }}
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col>
                      <Button type="submit">Cari Siswa</Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br />
        {this.state.visible ? (
          <InformasiSIswa periode={this.state.periode} nis={this.state.nis} />
        ) : null}
      </div>
    );
  }
}
