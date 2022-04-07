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
  Badge
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faPrint
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Invoice from './Invoice';


import user from "./user.jpg";
import logo from "../Assets/LandingPageImg/Logo.png";

import "./PembayaranBulanan.css";

export default class PembayaranBulanan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal: false
    };
  }

  componentDidMount() {
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios
      .get(`https://api-sps.my.id/user/pembayaran/bulanan/${id}`)
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
      });
  }

  onModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    const desktop = [
      {
        dataField: "month_id",
        text: "No",
        sort: true,
        align: "center",
        headerStyle: {
          width: "5%",
          textAlign: "center",
        }
      },
      {
        dataField: "month_nama",
        text: "Bulan",
        align: "center",
        headerStyle: {
          width: "15%",
          textAlign: "center",
        }
      },
      {
        text: "Status",
        formatter: (cell, row) => {
          
          if (row.bulanan_status === 1) {
            return (
              <Badge bg="success">Lunas</Badge>
            )
          } else {
            return (
              <Badge bg="danger">Belum Lunas</Badge>
            )
          }
        },
        align: "center",
        headerAlign: "center",
        headerStyle: {
          width: "10%",
        }
      },
      {
        text: "Tanggal Bayar",
        formatter: (cell, row) => {
          if (row.bulanan_status == 1) {
            //   display date without time
            var date = new Date(row.bulanan_tanggal);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var year = date.getFullYear();
            // get day of the week
            var dayOfWeek = date.getDay();
            // get name of the day
            var dayName = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
            // get name of the month
            var monthNames = [
              "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            var monthName = monthNames[month - 1];
            return (
              <div>
                {dayName[dayOfWeek]}, {day} {monthName} {year}
              </div>
            );
          } else {
            return <div>-</div>;
          }
        },
        align: "center",
        headerStyle: {
          width: "20%",
          textAlign: "center",
        }
      },
      {
        text: "Jumlah",
        formatter: (cell, row) => {
          if (row.bulanan_status == 1) {
            return <div>Rp. {row.bulanan_tagihan.toLocaleString("id-ID")}</div>;
          } else {
            return <div>Rp. 0</div>;
          }
        },
        headerStyle: {
          width: "10%",
        }
      },
      {
        dataField: "admin_nama",
        text: "Petugas",
        align: "center",
        headerStyle: {
          width: "15%",
          textAlign: "center",
        }

      },
      {
        text: "Aksi",
        formatter: (cell, row) => {
          // if bulanan status is 1, then make a button to cetak
          // else, make a disabled button to cetak
          if (row.bulanan_status == 1) {
            return (
              <div>
                <Link to={`/user/invoice/bulanan/${id}`}>
                  <Button variant="warning"><FontAwesomeIcon icon={faPrint} /></Button>
                </Link>
              </div>
            );
          } else {
            return (
              <div>
                <Button variant="warning" disabled><FontAwesomeIcon icon={faPrint} /></Button>
              </div>
            );
          }
        },
        align: "center",
        headerStyle: {
          width: "10%",
          textAlign: "center",
        }
      }
    ];

    const mobile = [
      // {
      //   dataField: "month_id",
      //   text: "No",
      //   sort: true,
      //   align: "center",
      //   headerStyle: {
      //       width: "13%",
      //       textAlign: "center",
      //   }
      // },
      {
        dataField: "month_nama",
        text: "Bulan",
      },
      {
        align: "center",
        headerAlign: "center",
        text: "Status",
        formatter: (cell, row) => {
          if (row.bulanan_status === 1) {
            return (
              <Badge bg="success">Lunas</Badge>
            )
          } else {
            return (
              <Badge bg="danger">Belum Lunas</Badge>
            )
          }
        }
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        align: "center",
        // make delete and update button
        formatter: (cellContent, row) => {
          if (row.bulanan_status == 1) {
            return (
              <div>
                <Button onClick={this.onModal} variant="outline-warning"><FontAwesomeIcon icon={faPrint} /></Button>
              </div>
            );
          } else {
            return (
              <div>
                <Button variant="outline-warning" disabled><FontAwesomeIcon icon={faPrint} /></Button>
              </div>
            );
          }
        },
        headerStyle: {
          width: "20%",
          textAlign: "center",
        }
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
