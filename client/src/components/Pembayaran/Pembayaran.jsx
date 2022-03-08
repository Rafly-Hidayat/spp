import React, { Component } from "react";
import {
  Card,
  Form,
  Row,
  Col,
  Container,
  Tab,
  Tabs,
  Button,
  Modal,
  Nav,
  Table,
  FormSelect,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Pembayaran extends Component {
  constructor(props) {
    super(props);
    let showInfo = true;
    this.state = {
      showInfo,
      data: [],
      databulanan : [],
      periode: [],
      nis: "",
      nis_siswa: "",
      tahun_ajaran: "",
      nama: "",
      jenis_kelamin: "",
    };
  }
  getPeriode = () => {
    axios.get("http://localhost:8000/periode").then((res) => {
      this.setState({
        periode: res.data,
      });
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getBebas = () => {
    const id = this.state.nis;
    axios.get(`http://localhost:8000/bebas/${id}`).then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  getBulanan = () => {
    const id = this.state.nis;
    axios.get(`http://localhost:8000/bulanan/${id}`)
    .then((res) => {
      console.log(this.state.nis)
      this.setState({
        databulanan : res.data
      })
    })
  }

  Cari = () => {
    const id = this.state.nis;
    axios.get(`http://localhost:8000/siswa_nis/${id}`).then((res) => {
      console.log(this.state.data)
      this.setState({
        nis_siswa: res.data[0].siswa_nis,
        nama: res.data[0].siswa_nama,
        jenis_kelamin: res.data[0].siswa_gender,
        showInfo: true,
      });
    });
    this.getBebas();  
    // this.getBulanan();
  };

  componentDidMount = () => {
    this.getPeriode();
    console.log(this.state.nis)
    // this.getPembayaran();
  };
  render() {
    const data = this.state.data;
    const databulanan = this.state.databulanan
    const columns = [
      {
        dataField: "siswa_nama",
        text: "Nama",
      },
      {
        dataField: "pembayaran_tipe",
        text: "Tipe Pembayaran",
      },
      {
        dataField: "bebas_tagihan",
        text: "Total Tagihan",
        formatter: ( row) => {
          // count bebas_tagihan minus bebas_total_bayar
          return <div>Rp. {row.bebas_tagihan - row.bebas_total_bayar}</div>;
        },
      },
      {
        dataField: "bebas_total_bayar",
        text: "Dibayar",
        formatter: (row) => {
          return <div>Rp. {row.bebas_total_bayar}</div>;
        },
      },
      {
        text: "Bayar",
        formatter: () => {
          return (
            <Link to={`/admin/pembayaran/tambah/${this.state.nis}`}>
              <Button>Bayar</Button>
            </Link>
          );
        },
      },
    ];
    return (
      <div>
        {/* Make a form input NIS siswa inside card */}
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Pembayaran</Card.Title>
            <hr />
            <Form>
              <Row>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="auto">
                      Tahun Ajaran
                    </Form.Label>
                    <Col>
                      <FormSelect
                        name="tahun_ajaran"
                        onChange={this.handleChange}
                      >
                        <option>Pilih Tahun Ajaran</option>
                        {this.state.periode.map((item) => {
                          return (
                            <option key={item.periode_id}>
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
                      <Form.Control
                        type="number"
                        placeholder="NIS Siswa"
                        name="nis"
                        id="nis"
                        value={this.state.nis}
                        noValidate
                        onChange={this.handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group as={Row} className="mb-3">
                    <Col>
                      <Button variant="primary" block onClick={this.Cari}>
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Informasi Siswa</Card.Title>
            <hr />
            <Table striped hover size="sm">
              <tbody>
                <tr>
                  <td>Tahun Ajaran</td>
                  <td>{`${this.state.tahun_ajaran}`}</td>
                </tr>
                <tr>
                  <td>NIS</td>
                  <td>{`${this.state.nis_siswa}`}</td>
                </tr>
                <tr>
                  <td>Nama Siswa</td>
                  <td>{`${this.state.nama}`}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>{`${this.state.jenis_kelamin}`}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            {/* <Tabs
              defaultActiveKey="home"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="Home">
                <br />
                <br /> */}
                <BootstrapTable
                  keyField="id"
                  data={data}
                  columns={columns}
                  striped
                  hover
                  condensed
                  bordered={false}
                  // selectRow={ selectRow }
                />
              {/* </Tab> */}
              {/* <Tab eventKey="profile" title="profile">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={databulanan}
                  columns={columns}
                  striped
                  hover
                  condensed
                  bordered={false}
                  // selectRow={ selectRow }
                />
              </Tab> */}
            {/* </Tabs> */}
          </Card.Body>
        </Card>
        <Modal open={this.state.showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
