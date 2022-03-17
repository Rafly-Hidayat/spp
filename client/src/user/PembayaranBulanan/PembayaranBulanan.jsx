import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Form,
  Nav,
  Navbar,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faCreditCard,
  faBell,
  faChevronRight,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import user from "./user.jpg";
import logo from "../Assets/LandingPageImg/Logo.png";

import "./PembayaranBulanan.css";

export default class PembayaranBulanan extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      data: [],
      loggedIn,
    };
  }

  getPostAPI = () => {
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios
      .get(`http://localhost:8000/user/pembayaran/bulanan/${id}`)
      .then((result) => {
        console.log(result.data);
        this.setState({
          data: result.data,
        });
      });
  };

  // json-server --watch db.json --port 3004

  componentDidMount() {
    this.getPostAPI();
  }

  render() {
    const desktop = [
      {
        dataField: "month_id",
        text: "No",
        sort: true,
        align: "center",
        headerAlign: "center",
        headerStyle: (colum, colIndex) => {
          return { width: '80px' };
        }
      },
      {
        dataField: "pos_nama",
        text: "Deskripsi",
        headerAlign : 'center',
        align : "center"
      },
      {
        dataField: "bulanan_tanggal",
        text: "Tanggal",
        headerAlign : 'center',
        align : "center",
        // make type date with d m y only
        formatter: (cell, row) => {
          return (
            <div>
              {new Date(cell).toLocaleDateString("id-ID")}
            </div>
          );
        },
      },
      {
        dataField: "month_nama",
        text: "Bulan",
        headerAlign : 'center',
        align : "center"
      },
      {
        dataField: "bulanan_tagihan",
        text: "Jumlah",
        headerAlign : 'center',
        align : "center"
      },
      {
        text: "Status",
        formatter(cell, row) {
          if (row.bulanan_status === 1) {
            return (
                <Badge bg='success'>Lunas</Badge>
            );
          } else {
            return (
                <Badge bg='danger'>Belum Lunas</Badge>
            );
          }
        },
      },
      {
        text: "Detail",
        formatter : (cell, row) => {
          if (row.bulanan_status === 1) {
            return (
                <Button variant='warning'><FontAwesomeIcon icon={faPrint} /></Button>
            );
          } else {
            return (
              <Button variant='secondary' disabled><FontAwesomeIcon icon={faPrint} /></Button>
            );
          }
        }
      }
    ];

    const mobile = [
      {
        dataField: "id",
        text: "No",
        sort: true,
      },
      {
        dataField: "month_nama",
        text: "Bulan",
      },
      {
        text: "Status",
        formatter: (cell, row) => {
          if (row.bulanan_status === 1) {
            return <p style={{ color: "green" }}>Lunas</p>;
          } else {
            return <p style={{ color: "red" }}>Belum Lunas</p>;
          }
        },
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        align: "center",
        headerAlign: "center",
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              <Container>
                <Row>
                  <Col>
                    {/* <Link to={`/admin/jurusan/ubah/${row.jurusan_id}`} > */}
                    <Button variant="warning" className="mr-2 " block>
                      <FontAwesomeIcon icon={faInfo} />
                    </Button>
                    {/* </Link> */}
                  </Col>
                </Row>
              </Container>
            </div>
          );
        },
      },
    ];

    return (
      <div>
        <div className="data-user">
          {/* Navbar */}

          {/* Sidebar */}

          {/* Data Table  */}
          <Card body>
            {/* Tampilan Desktop */}
            <div className="desktop">
              <BootstrapTable
                keyField="id"
                data={this.state.data}
                columns={desktop}
                noDataIndication="Table is Empty"
                bordered={false}
              />
            </div>

            {/* Tampilan Mobile */}
            <div className="mobile">
              <BootstrapTable
                keyField="id"
                data={this.state.data}
                columns={mobile}
                noDataIndication="Table is Empty"
                bordered={false}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
