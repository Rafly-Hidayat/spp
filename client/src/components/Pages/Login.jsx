import React, { Component } from "react";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import bg from "../Assets/G10.png";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      nis: "",
      password: "",
      dataError: "",
      errorMessage: "",
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
        .post("http://localhost:8000/siswa/login", data)
        .then((res) => {
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
            status: res.data.status,
          });
          if (this.state.dataError) {
          } else {
            localStorage.setItem("dataSiswa", JSON.stringify({}));
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
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    if (this.state.status == false) {
    } else {
    }
    return (
      <div
        className="background"
        style={{
          backgroundColor: "rgb(229,229,229)",
          backgroundImage: `url(${bg})`,
          width: "100wh",
          height: "100vh",
        }}
      >
        <div
          style={
            {
              // backgroundImage : bg
            }
          }
        ></div>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Card
            style={{
              width: "446px",
              height: "502px",
              backgroundImage: `linear-gradient(180deg, #67C3F3, #5A98F2)`,
              border: "none",
              paddingTop: "48px",
              paddingBottom: "64px",
              paddingLeft: "50px",
              paddingRight: "50px",
              borderRadius: "15px",
            }}
          >
            <Card.Body>
              <div
                className="text-center"
                style={{
                  color: "white",
                  fontWeight: "900",
                  fontSize: "36px",
                }}
              >
                W E L C O M E
              </div>
              <div
                className="text-center"
                style={{
                  color: "white",
                  fontWeight: "bold",
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                Sign in to continue.
              </div>
              <div>
                <Form noValidate onSubmit={this.login}>
                  <div className="mt-4">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          marginTop: "10px",
                          fontSize: "16px",
                        }}
                      >
                        NIS
                      </Form.Label>
                      <Form.Control
                        name="nis"
                        id="nis"
                        placeholder="NIS"
                        className="form-control"
                        style={{
                          color: "white",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          backgroundColor: "transparent",
                          border: "2px solid white",
                          borderRadius: "10px",
                        }}
                        value={this.state.nis}
                        onChange={this.handleChange}
                        noValidate
                      />
                      <div>
                        {this.state.dataError ? (
                          <div style={{ color: "red" }}>
                            {this.state.errorMessage}
                          </div>
                        ) : null}
                        {this.validator.message(
                          "nis",
                          this.state.nis,
                          `required|num`,
                          { className: "text-danger" }
                        )}
                      </div>
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Password
                    </Form.Label>
                    <Form.Control
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Password"
                      style={{
                        color: "white",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        backgroundColor: "transparent",
                        border: "2px solid white",
                        borderRadius: "10px",
                      }}
                      value={this.state.password}
                      onChange={this.handleChange}
                      noValidate
                    />
                    <div>
                      {this.state.dataError ? (
                        <div style={{ color: "red" }}>
                          {this.state.errorMessage}
                        </div>
                      ) : null}
                      {this.validator.message(
                        "password",
                        this.state.password,
                        `required|min:4`,
                        { className: "text-danger" }
                      )}
                    </div>
                  </Form.Group>
                  <Row>
                    <Form.Group as={Col} className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Remember Me"
                        style={{
                          color: "white",
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
                          color: "white",
                          fontWeight: "bold",
                          // marginTop: "10px",
                          fontSize: "15px",
                          textDecoration: "none",
                        }}
                      >
                        Forgot Password ?
                      </a>
                    </Form.Group>
                  </Row>
                  <Row style={{ padding: 10 }}>
                    <Button
                      type="submit"
                      block
                      style={{
                        color: "#5C9CF2",
                        backgroundColor: "#ffff",
                        fontWeight: "bold",
                        borderRadius: "10px",
                      }}
                    >
                      L O G I N
                    </Button>
                  </Row>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}
