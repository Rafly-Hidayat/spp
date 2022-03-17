import React, { Component } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCreditCard,
  faUserCheck,
  faUserTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import DatePicker from "sassy-datepicker";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Dashboard";
    this.state = {
      totalSiswa: "",
      totalJurusan: "",
      totalKelas: "",
      rekapBebas: "",
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8000/total/siswa").then((res) => {
      this.setState({
        totalSiswa: res.data.total,
      });
    });
    axios.get("http://localhost:8000/total/jurusan").then((res) => {
      console.log(res.data.total);
      this.setState({
        totalJurusan: res.data.total,
      });
    });
    axios.get("http://localhost:8000/total/kelas").then((res) => {
      this.setState({
        totalKelas: res.data.total,
      });
    });
    axios.get("http://localhost:8000/laporan/harian/bebas").then((res) => {
      console.log(res)
      this.setState({
        rekapBebas: res.data,
        
      })
    })
  }
  render() {

    const data = this.state.rekapBebas
    const onChange = (date) => {
      console.log(date.toString());
    };

    const columns = [
      {
        dataField: "id",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "bulan",
        text: "Kelas",
      },
      {
        dataField: "tgl_bayar",
        text: "Deskripsi",
      },
      {
        dataField: "jumlah",
        text: "Nominal",
      },
      {
        dataField: "",
        text: "Tanggal",
      },
      {
        dataField: "terbayar",
        text: "Petugas",
      },
    ];
    return (
      <div>
        <Container>

        <Row>
          {/* Card */}
          <Col md={3} sm={6}>
            <Card body bg="primary" className="card" sm={5}>
              <Row>
                <Col md={4} className="icon">
                  <FontAwesomeIcon icon={faUsers} />
                </Col>
                <Col md={8} className="content">
                  <h1>{this.state.totalSiswa}</h1>
                  <h6>Jumlah Siswa</h6>
                </Col>
              </Row>
            </Card>
            
            <Card body bg="success" className="card1">
              <Row>
                <Col md={4} className="icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </Col>
                <Col md={8} className="content">
                  <h1> {this.state.totalJurusan}</h1>
                  <h6>Jurusan</h6>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col md={3} sm={6}>
            <Card body bg="danger" className="card">
              <Row>
                <Col md={4} className="icon">
                  <FontAwesomeIcon icon={faUserTimes} />
                </Col>
                <Col md={8} className="content">
                  <h1> {this.state.totalKelas}</h1>
                  <h6>Kelas</h6>
                </Col>
              </Row>
            </Card>
            
            <Card body bg="secondary" className="card1">
              <Row>
                <Col md={4} className="icon">
                  <FontAwesomeIcon icon={faUserCheck} />
                </Col>
                <Col md={8} className="content">
                  <h1> 16</h1>
                  <h6>Sudah Lunas</h6>
                </Col>
              </Row>
            </Card>
          </Col>
        <Col md={1}>
                <DatePicker
                  onChange={onChange}
                  style={{
                    width: "755%",
                    height: "100%",
                    border: "5px absolute",
                  }}
                  />
              </Col>
          </Row>
        </Container>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Header>
            Rekap Harian <strong>Pembayaran Bebas*</strong>
          </Card.Header>
          <Card.Body>
            <div>
              <BootstrapTable
                keyField="id"
                data={data}
                columns={columns}
                noDataIndication="Data Tidak Ditemukan"
                bordered={false}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
