import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Nav,
  Navbar,
  FormControl,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faInfo,
  faBell,
  faChevronRight,
  faPrint,
  faFileArchive,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Swal from "sweetalert2";

import logo from "../Assets/LandingPageImg/Logo.png";

import "./PembayaranBebas.css";
import { text } from "@fortawesome/fontawesome-svg-core";
import Feedback from "react-bootstrap/esm/Feedback";

export default class PembayaranBebas extends Component {
  constructor(props) {
    super(props);

    const user = localStorage.getItem("dataSiswa");

    this.state = {
      data: [],
      datasiswa: [],
      details: false,
      data_details: [],
      d_bebas_id: "",
    };
  }

  getSiswa = () => {
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios
      .get(`https://api-sps.my.id/user/pembayaran/bebas/${id}`)
      .then((res) => {
        
        if (res.data.error === true) {
          this.setState({
            data: "",
          });
        } else {
          this.setState({
            data: res.data,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Gagal terhubung ke server, silahkan coba lagi!`,
        });
      });
  };

  getDetails = () => {
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios.get(`https://api-sps.my.id/user/detail/bebas/${id}`).then((res) => {
      
      this.setState({
        details: true,
        data_details: res.data,
      });
    });
  };

  componentDidMount() {
    // this.getDetails();
    this.getSiswa();
    document.title = "User | Pembayaran";
  }

  render() {
    
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;

    const detail = [
      {
        dataField: "no_transaksi",
        text: "No Transaksi",
      },
      {
        dataField: "d_bebas_deskripsi",
        text: "Deskripsi",
      },
      {
        dataField: "d_bebas_bayar",
        text: "Nominal",
      },
      {
        dataField: "d_bebas_tanggal",
        text: "Tanggal",
      },
      {
        dataField: "admin_id",
        text: "Admin",
        formatter: (cell, row) => {
          if (row.admin_id === "1") {
            return "admin";
          } else {
            return "admin2";
          }
        },
      },

      // make a action print
      {
        dataField: "d_bebas_id",
        text: "Action",
        formatter: (cell, row) => {
          return (
            <div>
              <Link to={`/user/invoice/bebas/${id}/${row.d_bebas_id}`}>
                <Button variant="outline-warning" size="sm">
                  <FontAwesomeIcon icon={faPrint} /> Cetak
                </Button>
              </Link>
            </div>
          );
        },
      },
    ];
    const desktop = [
      {
        text: "Tipe Pembayaran",
        headerStyle: (colum, colIndex) => {
          return { width: "300px" };
        },
        formatter: (cell, row) => {
          return (
            <div>
              {`${row.pos_nama} - T.A ${row.periode_mulai}/${row.periode_akhir}`}
            </div>
          );
        }
      },
      {
        text: "Jumlah",
        formatter: (cell, row) => {
          return <div>Rp. {row.bebas_tagihan.toLocaleString("id-ID")}</div>;
        },
      },
      {
        text: "Dibayar",
        formatter: (cell, row) => {
          return <div>Rp. {row.bebas_total_bayar.toLocaleString("id-ID")}</div>;
        },
      },
      {
        text: "Sisa Tagihan",
        formatter: (cell, row) => {
          // count bebas_tagihan minus bebas_total_bayar and turn to LocaleString("id")
          return (
            <div>
              Rp.{" "}
              {(
                parseInt(row.bebas_tagihan) - parseInt(row.bebas_total_bayar)
              ).toLocaleString("id")}
            </div>
          );
        },
      },
      {
        text: "Status",
        formatter: (cell, row) => {
          // if bebas_tagihan minus bebas_total_bayar is 0, then return "Lunas"
          if (
            parseInt(row.bebas_tagihan) - parseInt(row.bebas_total_bayar) ===
            0
          ) {
            return <Badge bg="success">Lunas</Badge>;
          }
          // else return "Belum Lunas"
          else {
            return <Badge bg="danger">Belum Lunas</Badge>;
          }
        },
        align: "center",
        headerAlign: "center",
      },
      {
        text: "Aksi",
        formatter: (cell, row) => {
          return (
            <div>
              <Button onClick={this.getDetails} variant="outline-success">
                <FontAwesomeIcon icon={faInfo} /> Info
              </Button>
            </div>
          );
        },

        // headerAlign : 'center'
      },
    ];

    const data = this.state.data;

    const mobile = [
      {
        dataField: "pos_nama",
        text: "Pembayaran",
      },
      {
        text: "Tagihan",
        formatter: (cell, row) => {
          // count bebas_tagihan minus bebas_total_bayar and turn to LocaleString("id")
          return (
            <div>
              Rp.
              {(
                parseInt(row.bebas_tagihan) - parseInt(row.bebas_total_bayar)
              ).toLocaleString("id")}
            </div>
          );
        },

        headerAlign: "center"
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        formatter: (cellContent, row) => {

          if (
            parseInt(row.bebas_tagihan) - parseInt(row.bebas_total_bayar) ===
            0
          ) {
            return (
              <Button variant="warning">
                <FontAwesomeIcon icon={faPrint} />
              </Button>
            );
          } else {
            return (
              <Button variant="warning" disabled>
                <FontAwesomeIcon icon={faPrint} />
              </Button>
            );
          }
        },
        align: "center",
        headerStyle: {
          width: "20%",
          textAlign: "center",
        },
      },
    ];

    return (
      <div>
        <div className="data-user">
          {/* Data Table  */}
          <Card body>
            {/* Tampilan Desktop */}
            <div className="desktop">
              <BootstrapTable
                keyField="id"
                data={
                  this.state.details === false
                    ? this.state.data
                    : this.state.data_details
                }
                columns={this.state.details === false ? desktop : detail}
                noDataIndication="Table is Empty"
                bordered={false}
              />
              {this.state.details === true ? (
                <Button
                  onClick={() => {
                    this.setState({ details: false });
                  }}
                >
                  Kembali
                </Button>
              ) : null}
            </div>

            {/* Tampilan Mobile */}
            <div className="mobile">
              <BootstrapTable
                keyField="id"
                data={data}
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
