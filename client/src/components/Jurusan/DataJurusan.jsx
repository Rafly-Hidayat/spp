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
    document.title = "Admin | Data Jurusan";

    this.state = {
      data: [],
    };
  }

  getAdmin = () => {
    axios.get("https://api-sps.my.id/jurusan/").then((res) => {
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

  handleRemove = (jurusan_id) => {
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
          .delete(`https://api-sps.my.id/hapus/jurusan/${jurusan_id}`)
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
              this.props.history.push("/admin/jurusan");
            }
          })
          .catch((err) => {
            
          });
        this.props.history.push("/admin/jurusan");
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
        dataField: "jurusan_id",
        text: "No",
      },
      {
        dataField: "jurusan_nama",
        text: "Nama Jurusan",
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
                <Link to={`/admin/jurusan/ubah/${row.jurusan_id}`}>
                      <Button variant="outline-warning" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>&ensp;
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.jurusan_id)}
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
          <Card.Title>Data Jurusan</Card.Title>
            <hr/>
            <Link to={"/admin/jurusan/tambah"}>
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
