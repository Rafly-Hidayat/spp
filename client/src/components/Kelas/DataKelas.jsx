import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Breadcrumb } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default class DataKelas extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Data Kelas";

    this.state = {
      data: [],
    };
  }

  getkelas = () => {
    axios.get("https://api-sps.my.id/kelas/").then((res) => {
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

  handleRemove = (kelas_id) => {
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
          .delete(`https://api-sps.my.id/hapus/kelas/${kelas_id}`)
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
        this.props.history.push("/admin/kelas");
      }
    });
  };

  componentDidMount() {
    this.getkelas();
  }
  render() {
    const data = this.state.data;
    const selectRow = {
      clickToSelect: true,
    };
    const columns = [
      {
        dataField: "kelas_id",
        text: "No",
        sort: true,
      },
      {
        dataField: "kelas_nama",
        text: "Nama Kelas",
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
                    <Link to={`/admin/kelas/ubah/${row.kelas_id}`}>
                      <Button variant="outline-warning" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>&ensp;
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.kelas_id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
              </Container>
            </div>
          );
        },
      },
    ];
    const defaultSorted = [
      {
        dataField: "kelas_id",
        order: "asc",
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
              <Breadcrumb.Item><Link to="/admin/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
              <br/>
        <Card style={{color: 'black'}}>
          <Card.Body>
          <Card.Title>Data Kelas</Card.Title>
            <hr/>
            <Link to={"/admin/kelas/tambah/"}>
              <Button variant="outline-primary" block>
                Tambah
              </Button>
            </Link>
            <br/>
            <br/>
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              defaultSorted={defaultSorted}
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
