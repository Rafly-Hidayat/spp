import React, { Component } from "react";
import { Button, Row, Col, Form, Card, FormSelect } from "react-bootstrap";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


export default class AddPembayaran extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Pembayaran Bebas";
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      id: this.props.match.params.id,
      admin: "",
      data: [],
      nominal: "",
      keterangan: "",
      periode : ""
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  Submit = (e) => {
    e.preventDefault();
    const data = {
      admin_id: this.state.admin,
      nominal: this.state.nominal,
      keterangan: this.state.keterangan,
    };
    if (this.validator.allValid() && this.state.keterangan !== "") {
      axios
        .post(`https://api-sps.my.id/bebas/bayar/${this.state.id}`, data)
        .then((res) => {
          
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text: `${res.data.message}`,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: `Pembayaran Berhasil!`,
            });
            this.props.history.push({pathname :"/admin/pembayaran" , state: {nis : `${this.state.nis}`, periode : `${this.state.periode}`}});
          }
        })
        .catch((error) => {});
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  };
  componentDidMount() {
    axios.get("https://api-sps.my.id/admin").then((res) => {
      this.setState({
        data: res.data,
      });
    });

    if(this.props.location){
      this.setState({
        nis : this.props.location.state.nis,
        periode : this.props.location.state.periode
      })
    }

  }
  
  render() {
    return (
      <Card style={{ color: "black" }}>
        <Card.Body>
          <Card.Title>Pembayaran</Card.Title>
          <Form onSubmit={this.Submit}>
            <Form.Group className="mb-3">
              <hr />
              <Form.Label>
                Nama Admin
                <span className="text-danger">*</span>
              </Form.Label>
              <FormSelect name="admin" onChange={this.handleChange}>
                <option>=== Pilih Admin ===</option>
                {this.state.data.map((item) => (
                  <option key="" value={item.admin_id}>
                    {item.admin_nama}
                  </option>
                ))}
              </FormSelect>
              <div>
                {this.validator.message("admin", this.state.admin, `required`, {
                  className: "text-danger",
                  messages: {
                    required: "Pilih Nama Admin!",
                  },
                })}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Nominal
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="nominal"
                id="nominal"
                type="number"
                min="0"
                step="50000"
                onChange={this.handleChange}
                noValidate
                value={this.state.nominal}
              />
              <div>
                {this.validator.message(
                  "nominal",
                  this.state.nominal,
                  `required`,
                  {
                    className: "text-danger",
                    messages: {
                      required: "Masukkan Nominal yang ingin dibayarkan!",
                    },
                  }
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                Keterangan
                <span className="text-danger">*</span>
              </Form.Label>
              <FormSelect name="keterangan" onChange={this.handleChange}>
                <option value="">=== Pilih Keterangan ===</option>
                <option value="Cicil">Cicil</option>
                <option value="Lunas">Lunas</option>
                <option value="TRF-BJB">TRF-BJB</option>
                <option value="TRF-BNI">TRF-BNI</option>
              </FormSelect>
              <div>
                {this.validator.message(
                  "keterangan",
                  this.state.keterangan,
                  `required`,
                  {
                    className: "text-danger",
                    messages: {
                      required: "Masukkan keterangan!",
                    },
                  }
                )}
              </div>
            </Form.Group>
            <Button variant="outline-primary" type="submit">
              Bayar
            </Button>
            &ensp;
            <Link to={{pathname : "/admin/pembayaran/", state : {nis : `${this.state.nis}`, periode : `${this.state.periode}`}}}>
              <Button variant="outline-danger" type="submit">
                Batal
              </Button>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
