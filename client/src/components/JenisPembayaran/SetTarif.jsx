import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Card,
  InputGroup,
  FormSelect,
  Breadcrumb
} from "react-bootstrap";
import {Link} from 'react-router-dom'
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";

export default class SetTarif extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();

    this.state = {
      pembayaran_id: this.props.match.params.id,
      data_kelas: [],
      tarif: "",
      kelas: "",
      dataError: "",
      errorMessage: "",
      tipe: ""
    };
  }

  getKelas = () => {
    axios
      .get("http://localhost:8000/kelas/")
      .then((res) => {
        this.setState({
          data_kelas: res.data,
        });
      })
      .catch((err) => {});
  };
  getTipe = () => {
    axios.get(`http://localhost:8000/pembayaran/${this.state.pembayaran_id}`).then((res) => {
      console.log(res.data[0].pembayaran_tipe)
      console.log(this.state.pembayaran_id)
      this.setState({
        tipe: res.data[0].pembayaran_tipe,
      });
    });
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      pembayaran_id: this.state.pembayaran_id,
      kelas: this.state.kelas,
      tagihan: this.state.tarif,
    };
    if (this.validator.allValid()) {
      if (this.state.tipe === "BEBAS") {
      axios
        .post("http://localhost:8000/set_tarif/bebas", data)
        .then((res) => {
          console.log(res)
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${this.state.errorMessage}`,
            });
          } else {
            Swal.fire("Good job!", "Your data hasbeen added!", "success");
            this.props.history.push("/admin/jenispembayaran");
          }
          // this.props.history.push("/pembayaran");
        })
        .catch((err) => {

        });
      } else {
        axios.post("http://localhost:8000/set_tarif/bulanan", data).then((res) => {
          console.log(res)
          this.setState({
            dataError: res.data.error,
            errorMessage: res.data.message,
          });
          if (this.state.dataError) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${this.state.errorMessage}`,
            });
          } else {
            Swal.fire("Good job!", "Your data hasbeen added!", "success");
            this.props.history.push("/admin/jenispembayaran");
          }
          // this.props.history.push("/pembayaran");
        })
      }
    }
  };
  componentDidMount() {
    this.getKelas();
    this.getTipe();
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
              <Breadcrumb.Item><Link to="/admin/siswa/">Data</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Set</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Container>
          <Card style={{ color: "black" }}>
            <Card.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Kelas</Form.Label>
                  <FormSelect name="kelas" onChange={this.handleChange}>
                    <option>=== Pilih Kelas ===</option>
                    {this.state.data_kelas.map((data_kelas) => {
                      return (
                        <option
                          key={data_kelas.kelas_id}
                          value={data_kelas.kelas_id}
                        >
                          {data_kelas.kelas_nama}
                        </option>
                      );
                    })}
                  </FormSelect>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pembayaran ID</Form.Label>
                  <Form.Control
                    name="pembayaran_id"
                    id="pembayaran_id"
                    type="text"
                    value={this.state.pembayaran_id}
                    noValidate
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tarif</Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Text>Rp.</InputGroup.Text>
                    <Form.Control
                      name="tarif"
                      id="tarif"
                      type="number"
                      value={this.state.tarif}
                      noValidate
                      step="10000"
                      onChange={this.handleChange}
                    ></Form.Control>
                  </InputGroup>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
