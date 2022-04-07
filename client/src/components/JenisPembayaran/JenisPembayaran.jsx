import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrashAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar/SideBar";

export default class Data extends Component {
  constructor(props) {
    super(props);
    document.title = "Jenis Pembayaran";
    this.state = {
      data: [],
      tipe: "",
    };
  }

  getAdmin = () => {
    axios.get("https://api-sps.my.id/pembayaran/").then((res) => {
      this.setState({
        data: res.data,
        tipe: res.data[0].pembayaran_tipe,
      });
    });
  };

  handleRemove = (pembayaran_id) => {
    axios
      .delete(`https://api-sps.my.id/hapus/pembayaran/${pembayaran_id}`)
      .then((res) => {})
      .catch((err) => {});
    this.getAdmin();
  };

  componentDidMount() {
    this.getAdmin();
    // const get = this.state.data.map((data))
    //
  }
  render() {
    const data = this.state.data;
    const get = this.state.data.map((data) => {
      return data.periode_akhir;
    });

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "pembayaran_tipe",
        text: "Tipe",
      },
      {
        dataField: "periode_mulai",
        text: "Tahun Ajaran",
        formatter: (cellContent, row) => {
          return <div>{`${row.periode_mulai}/${row.periode_akhir}`}</div>;
        },
      },
      {
        dataField: "pos_nama",
        text: "Nama Pos",
      },
      {
        text: "Set Tarif",
        formatter: (cellContent, row) => {
          return (
            <div>
              <Link to={`/admin/pembayaran/set_tarif/${row.pembayaran_id}`}>
                <Button variant="outline-primary" className="mr-2" block>
                  Set Tarif
                </Button>
              </Link>
            </div>
          );
        },
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              <Container>
                <Link to={`/admin/jenis-pembayaran/ubah/${row.pembayaran_id}`}>
                  <Button variant="outline-warning" block>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Button>
                </Link>
                &ensp;
                <Button
                  variant="outline-danger"
                  onClick={() => this.handleRemove(row.pembayaran_id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
              </Container>
            </div>
          );
        },
      },
    ];
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
              <Breadcrumb.Item href="/admin/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br></br>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Jenis Pembayaran</Card.Title>
            <hr />
            <Link to={"/admin/jenis-pembayaran/tambah"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Tambah
              </Button>
            </Link>{" "}
            &ensp;
            <Link to={"/admin/bulanan/upload/"}>
              <Button variant="outline-success" block>
                Upload
              </Button>
            </Link>
            <br />
            <br />
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
          </Card.Body>
        </Card>
      </div>
    );
  }
}
