import React, { Component } from "react";
import { Button, Card, Col, Form, FormSelect, Row } from "react-bootstrap";
import InformasiSIswa from "./InformasiSIswa";
import axios from "axios";

export default class Pembayaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      data: [],
      nis : "",
      periode : "",
    };
  }
  

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getPeriode = () => {
    axios.get(`http://localhost:8000/periode`).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  componentDidMount() {
    this.getPeriode();
  }

  render() {
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <Form>
              <Row>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Tahun Ajaran
                    </Form.Label>
                    <Col>
                      <FormSelect  name="periode" onChange={this.handleChange}>
                        <option>Pilih Tahun Ajaran</option>
                        {this.state.data.map((item) => {
                          return (
                            <option value={item.id}>
                              {item.periode_mulai}/{item.periode_akhir}
                            </option>
                          );
                        })}
                      </FormSelect>
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Cari Siswa
                    </Form.Label>
                    <Col>
                      <Form.Control type="number" placeholder="NIS Siswa" name="nis" value={this.state.nis} onChange={this.handleChange} />
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col>
                      <Button
                        onClick={() => {
                          console.log(this.state.nis);
                          console.log(this.state.periode);
                          this.setState({
                            visible: true,
                          });
                        }}
                      >
                        Cari Siswa
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br />
        {this.state.visible ? <InformasiSIswa periode={this.state.periode} nis={this.state.nis} /> : null}
      </div>
    );
  }
}
