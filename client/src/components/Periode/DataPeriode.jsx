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
import Swal from "sweetalert2";

export default class Data extends Component {
  constructor(props) {
    document.title = "Admin | Data Periode";
    super(props);
    this.state = {
      data: [],
    };
  }

  getAdmin = () => {
    axios
      .get("https://api-sps.my.id/periode/")
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Gagal terhubung ke server, silahkan coba lagi!`,
        });
      });
  };

  handleRemove = (periode_id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data akan terhapus, tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://api-sps.my.id/hapus/periode/${periode_id}`)
          .then((res) => {
             if (res.data.error === true) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${res.data.message}`,
              });
            } else {
              Swal.fire({
                icon: "success",
                title: "Good Job!",
                text: `${res.data.message}`,
              });
            }
          })
          .catch((err) => {
            
          });
        this.props.history.push("/admin/periode");
      }
    });
  };

  componentDidMount() {
    this.getAdmin();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "periode_id",
        text: "No",
        
      },
      {
        dataField: "periode_mulai",
        text: "Tahun Ajaran",
        formatter: (cellContent, row) => {
          return <div>{`${row.periode_mulai}/${row.periode_akhir}`}</div>;
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
                <Link to={`/admin/periode/ubah/${row.periode_id}`}>
                  <Button variant="outline-warning" className="mr-2" block>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Button>
                </Link>
                &ensp;
                <Button
                  variant="outline-danger"
                  onClick={() => this.handleRemove(row.periode_id)}
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
              <Breadcrumb.Item>
                <Link to="/admin/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{color: 'black'}}>
          <Card.Body>
          <Card.Title>Data Periode</Card.Title>
            <hr/>
            <Link to={"/admin/periode/tambah"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Tambah
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
