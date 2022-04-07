import React, { Component } from "react";
import {
  Card,
  Form,
  Col,
  Row,
  Button,
  CardGroup,
  Image,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Link } from "react-router-dom";

import bg from "../Assets/G10.png";
import Swal from "sweetalert2";
import "./Login.css";
import logosp from "../Assets/logosp.svg";
import Kutas from "../Assets/KuTas.svg";
import KuWah from "../Assets/KuWah.svg";
import logo from "../Assets/logo.svg";
import power from "../Assets/PoweredBy.svg";
import Profile from "../Assets/Andi_Photo.svg";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      nis: "",
      password: "",
      dataError: "",
      status: "",
    };
  }
  login = (e) => {
    e.preventDefault();
    const data = {
      nis: this.state.nis,
      password: this.state.password,
    };
    if (this.validator.allValid()) {
      axios
        .post("https://api-sps.my.id/siswa/login", data)
        .then((res) => {
          
          if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${res.data.message}`,
            });
          } else {
            localStorage.setItem(
              "dataSiswa",
              JSON.stringify({
                id: res.data.siswa_id,
                nama: res.data.nama,
                gender: res.data.gender,
                status: res.data.status,
                kelas: res.data.kelas,
                nis: res.data.nis,
                kelas_nama: res.data.kelas_nama,
              })
            );
            this.props.history.push("/user");
            Swal.fire({
              icon: "success",
              title: "Login Success",
              text: `${res.data.message}`,
            });
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
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const loggedIn = localStorage.getItem("dataSiswa");
    if (loggedIn) {
      this.props.history.push("/user");
    }
    return (
      <div>
        <div
          className="wrapper-login"
          style={{
            justifyItems: "center",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <CardGroup>
            {/* card blue */}
            <Card className="form-content">
              <Image
                src={logosp}
                width={60}
                height={60}
                style={{
                  marginTop:"20px",
                  marginLeft: "15px",
                }}
              />
              <br />
              <Image
                src={Kutas}
                width={15}
                height={15}
                style={{
                  marginTop: "40px",
                  marginBottom: "20px",
                }}
              />
              <div style={{ color: "white" }}>
                Web nya sangat mudah dipahami.
                <br />
                Kalau kesulitan selalu didampingi, jadi merasa punya tim IT
                sendiri.
              </div>
              <Image
                src={KuWah}
                width={15}
                height={15}
                style={{
                  marginTop: "10px",
                  marginBottom: "50px",
                  float: "right",
                }}
              />
              <br />
              <br />
              <div className="d-flex">
                <Image
                  src={Profile}
                  width={80}
                  height={80}
                  style={{
                    marginLeft: "15px",
                    marginTop: "50px",
                  }}
                />
                <div>
                  
                <div className="profile-name">Andi Susandi S.Kom</div>
                <div className="comment">
                  Kepala Pemrograman RPL
                </div>
                </div>
              </div>
            </Card>

            {/* Card login */}
            <Card className="form-login">
              <Card.Body>
                <div className="header">W E L C O M E</div>
                <div className="content">Sign in to continue.</div>
                <div>
                  <Form noValidate onSubmit={this.login}>
                    <div className="mt-5">
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            marginTop: "10px",
                            fontSize: "16px",
                          }}
                        >
                          NIS
                        </Form.Label>
                        <Form.Control
                          placeholder="NIS"
                          name="nis"
                          value={this.state.nis}
                          onChange={this.handleChange}
                          noValidate
                        />
                        <div>
                          {this.validator.message(
                            "nis",
                            this.state.nis,
                            `required|numeric|min:0,num`,
                            { className: "text-danger" }
                          )}
                        </div>
                      </Form.Group>
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        Password
                      </Form.Label>
                      <Form.Control
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        noValidate
                      />
                      <div>
                        {this.validator.message(
                          "password",
                          this.state.password,
                          `required|min:4`,
                          { className: "text-danger" }
                        )}
                      </div>
                    </Form.Group>
                    {/* <Row>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Check
                          type="checkbox"
                          label="Remember Me"
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            // marginTop: "10px",
                            fontSize: "16px",
                          }}
                        />
                      </Form.Group>

                      <Form.Group as={Col}>
                        <a
                          href=""
                          style={{
                            color: "black",
                            fontWeight: "bold",
                            // marginTop: "10px",
                            fontSize: "15px",
                            textDecoration: "none",
                          }}
                        >
                          Forgot Password ?
                        </a>
                      </Form.Group>
                    </Row> */}
                    <Row style={{ padding: 10 }}>
                      <Button
                        type="submit"
                        block
                        style={{
                          color: "#5C9CF2",
                          backgroundColor: "#ffff",
                          fontWeight: "bold",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        L O G I N
                      </Button>
                      <br />
                      <Link
                        to="/"
                        style={{ color: "black", textDecoration: "none", marginLeft:"-10px" }}
                      >
                        Kembali
                      </Link>
                    </Row>
                  </Form>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
        <center>
          <div>
            <Image src={power} width={150} height={150} />
          </div>
        </center>
      </div>
    );
  }
}
