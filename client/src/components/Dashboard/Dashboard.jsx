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
  faChalkboardTeacher,
  faGraduationCap,
  faFileInvoiceDollar,
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
      bebas: [],
      bulanan: [],
    };
  }
  componentDidMount() {
    axios.get("https://api-sps.my.id/total/siswa").then((res) => {
      this.setState({
        totalSiswa: res.data.total,
      });
    });
    axios.get("https://api-sps.my.id/total/jurusan").then((res) => {
      
      this.setState({
        totalJurusan: res.data.total,
      });
    });
    axios.get("https://api-sps.my.id/total/pos").then((res) => {
      
      this.setState({
        totalPos: res.data.total,
      });
    });
    axios.get("https://api-sps.my.id/total/kelas").then((res) => {
      this.setState({
        totalKelas: res.data.total,
      });
    });
    axios.get("https://api-sps.my.id/laporan/harian/bebas").then((res) => {
      this.setState({
        bebas: res.data,
      });
    });
    axios.get("https://api-sps.my.id/laporan/harian/bulanan").then((res) => {
      this.setState({
        bulanan: res.data,
      });
    });
  }
  render() {

    const bebas = this.state.bebas;
    const bulanan = this.state.bulanan;
    const onChange = (date) => {
      
    };

    const columns = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "kelas_nama",
        text: "Kelas",
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
      },
      {
        dataField: "pos_nama",
        text: "Pembayaran",
      },
      {
        dataField: "d_bebas_deskripsi",
        text: "Keterangan",
      },
      {
        text: "Nominal",
        formatter: (cell, row) => {
          return <div>Rp. {row.d_bebas_bayar.toLocaleString("id")}</div>;
        },
      },
      {
        dataField: "admin_nama",
        text: "Petugas",
      },
    ];
    const defaultSorted = [{
      dataField: 'siswa_nama',
      order: 'desc'
    }];
    const column = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "kelas_nama",
        text: "Kelas",
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
      },
      {
        dataField: "pos_nama",
        text: "Deskripsi",
      },
      {
        dataField: "month_nama",
        text: "Bulan",
      },
      {
        dataField: "admin_nama",
        text: "Petugas",
      },
    ];
    return (
      <div>
        <div className="dashboard">
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
                    <FontAwesomeIcon icon={faGraduationCap} />
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
                    <FontAwesomeIcon icon={faChalkboardTeacher} />
                  </Col>
                  <Col md={8} className="content">
                    <h1> {this.state.totalKelas}</h1>
                    <h6>Kelas</h6>
                  </Col>
                </Row>
              </Card>

              <Card body bg="secondary" className="card1">
                <Row>
                  <Col md={3} className="icon">
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                  </Col>
                  <Col md={9} className="content">
                    <h1> {this.state.totalPos}</h1>
                    <h6 >Tipe Pembayaran</h6>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col md={6}>
              <DatePicker
                onChange={onChange}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "5px absolute",
                }}
              />
            </Col>
          </Row>
        </div>

        <br />
        <Card style={{ color: "black" }}>
          <Card.Header>
            Rekap Harian <strong>Pembayaran Bebas*</strong>
          </Card.Header>
          <Card.Body>
            <div>
              <BootstrapTable
                keyField="id"
                data={bebas}
                columns={columns}
                noDataIndication="Data Tidak Ditemukan"
                bordered={false}
                defaultSorted={defaultSorted}
              />
            </div>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Header>
            Rekap Harian <strong>Pembayaran Bulanan*</strong>
          </Card.Header>
          <Card.Body>
            <div>
              <BootstrapTable
                keyField="id"
                data={bulanan}
                columns={column}
                noDataIndication="Data Tidak Ditemukan"
                bordered={false}
                defaultSorted={defaultSorted}
              />
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
