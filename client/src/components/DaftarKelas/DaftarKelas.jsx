import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Breadcrumb, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt, faUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default class Data extends Component {
  constructor(props) {
    super(props);
    document.title = "Daftar Kelas";
    this.state = {
      data: [],
    };
  }

  getAdmin = () => {
    axios.get("https://api-sps.my.id/d_kelas/").then((res) => {
      
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

  handleRemove = (d_kelas_id) => {
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
          .delete(`https://api-sps.my.id/hapus/d_kelas/${d_kelas_id}`)
          .then((res) => {
            
            if (res.data.error === true ) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${res.data.message}`,
              });
            } else {
              Swal.fire({
              icon: "success",
              title: "Good Job!",
              text: `${res.data.message}`,});
              this.props.history.push("/admin/daftar-kelas");
            }
          })
          .catch((err) => {
            
          });
      }
    });
  };

  componentDidMount() {
    this.getAdmin();
  }
  render() {

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };
    const data = this.state.data;
    const columns = [
      {
        dataField: "d_kelas_id",
        text: "No",
      },
      {
        dataField: "d_kelas_nama",
        text: "Daftar Kelas",
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
                <Link to={`/admin/daftar-kelas/ubah/${row.d_kelas_id}`}>
                      <Button variant="outline-warning" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>&ensp;
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.d_kelas_id)}
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
        <br/>
        <Card style={{color: 'black'}}>
          <Card.Body>
          <Card.Title>Data Daftar Kelas</Card.Title>
            <hr/>
            <Link to={"/admin/daftar-kelas/tambah"}>
              <Button variant="outline-primary" block="">
                Tambah
              </Button>
            </Link>
              <br/>
              <br/>
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              striped
              hover
              condensed
              bordered={false}
              noDataIndication="Data Tidak Ditemukan"
              // selectRow={ selectRow }
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
