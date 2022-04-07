import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Swal from "sweetalert2";

export default class DataPos extends Component {
  constructor(props) {
    document.title = "Admin | Data Pos";
    super(props);
    this.state = {
      data: [],
    };
  }

  getPos = () => {
    axios
      .get("https://api-sps.my.id/pos/")
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

  handleRemove = (pos_id) => {
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
          .delete(`https://api-sps.my.id/hapus/pos/${pos_id}`)
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
        this.props.history.push("/admin/pos");
      }
    });
  };

  componentDidMount() {
    this.getPos();
  }
  render() {
    
    const data = this.state.data;
    const columns = [
      {
        dataField: "pos_id",
        text: "No",
        headerStyle: (colum, colIndex) => {
          return { width: "100px"};
        },
      },
      {
        dataField: "pos_nama",
        text: "Nama Pos",
      },
      {
        dataField: "pos_deskripsi",
        text: "Keterangan",
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        align: "center",
        headerAlign: "center",
        formatter: (cellContent, row) => {
          return (
            <div>
              <Container>
                <Link to={`/admin/pos/ubah/${row.pos_id}`}>
                  <Button variant="outline-warning" block>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Button>
                </Link>
                &ensp;
                <Button
                  variant="outline-danger"
                  onClick={() => this.handleRemove(row.pos_id)}
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
        <Card.Title>Data Pos Pembayaran</Card.Title>
        <hr/>
            <Link to={"/admin/pos/tambah"}>
              <Button variant="outline-primary" block>
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
                    />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
