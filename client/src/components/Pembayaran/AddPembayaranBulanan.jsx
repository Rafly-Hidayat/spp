import React, { Component } from "react";
import { Card, Form, FormSelect, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

export default class AddPembayaranBulanan extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Pembayaran Bulanan";

    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      id: this.props.match.params.id,
      admin: "",
      data: [],
      nis : "",
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
    const id = this.state.id;
    const data = {
      admin_id: this.state.admin,
    };
    if (this.validator.allValid()) {
      axios
        .put(`https://api-sps.my.id/bulanan/bayar/${id}`, data)
        .then((res) => {
          
          if(res.data.error === true) {
            Swal.fire({
              icon: "error",
              title: "Gagal!",
              text : `${res.data.message}`
            })
          } else {
            Swal.fire({
              icon: "success",
              title: "Berhasil!",
              text: `${res.data.message}`,
            });
            this.props.history.push({pathname: "/admin/pembayaran", state: {nis: `${this.state.nis}`, periode : `${this.state.periode}`}});
          }
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Gagal terhubung ke server!",
          });
        });
    } else {
      this.validator.showMessages();
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
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <Form onSubmit={this.Submit}>
              <Form.Group className="mb-3">
                <hr />
                <Form.Label>Nama Admin
                <span className="text-danger">*</span>
                </Form.Label>
                <FormSelect name="admin" onChange={this.handleChange}>
                  <option>Pilih Admin</option>
                  {this.state.data.map((item) => (
                    <option key="" value={item.admin_id}>
                      {item.admin_nama}
                    </option>
                  ))}
                </FormSelect>
                <div>
                  {this.validator.message(
                    "admin",
                    this.state.admin,
                    `required`,
                    {
                      className: "text-danger",
                      messages: {
                        required: "Pilih Nama Admin!",
                      },
                    }
                  )}
                </div>
              </Form.Group>
              <Button variant="outline-primary" type="submit">
                Bayar
              </Button>
              &ensp;
              <Link to={{pathname: `/admin/pembayaran`, state: {nis: `${this.state.nis}`, periode : `${this.state.periode}`}}}>
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
