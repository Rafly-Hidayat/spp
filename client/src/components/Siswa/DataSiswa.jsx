import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faSearch,
  faTrashAlt,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import paginationFactory from "react-bootstrap-table2-paginator";
import Swal from "sweetalert2";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import QRCode from "react-qr-code";

export default class DataSiswa extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Data Siswa";

    this.state = {
      data: [],
    };
  }

  getSiswa = () => {
    axios
      .get("https://api-sps.my.id/siswa/")
      .then((res) => {
        console.log(res.data);
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

  handleRemove = (siswa_id) => {
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
          .delete(`https://api-sps.my.id/hapus/siswa/${siswa_id}`)
          .then((res) => {
            if (res.data.error === true) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${res.data.message}`,
              });
              this.setState({
                nis: "",
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
        this.props.history.push("/admin/siswa");
      }
    });
  };

  componentDidMount() {
    this.getSiswa();
  }
  render() {
    const { SearchBar } = Search;
    const data = this.state.data;
    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      disablePageTitle: true,
      sizePerPageList: [
        {
          text: "5",
          value: 5,
        },
        {
          text: "10",
          value: 10,
        },
        {
          text: "All",
          value: data.length,
        },
      ], // A numeric array is also available. the purpose of above example is custom the text
    };
    const columns = [
      {
        dataField: "siswa_img",
        text: "Foto Siswa",
        align: "center",
        headerStyle: {
          width: "120px",
          textAlign: "center",
        },
        formatter: (cellContent, row) => {
          return (
            <img
              src={row.siswa_img}
              width={40}
              height={40}
              style={{ borderRadius: "20px" }}
            />
          );
        },
      },
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
        headerStyle: {
          width: "300px",
        },
      },
      {
        dataField: "siswa_nis",
        text: "NIS",
      },
      {
        text: "Jenis Kelamin",
        formatter: (cellContent, row) => {
          if (row.siswa_gender === "L") {
            return <div>Laki-Laki</div>;
          } else {
            return <div>Perempuan</div>;
          }
        },
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
      // {
      //   text: "QR Code",
      //   formatter: (cell, row) => {
      //     return (
      //       <div>
      //         <QRCode
      //           className="code"
      //           value={row.siswa_nis}
      //           size={80}
      //         />
      //       </div>
      //     )
      //   }
      // },
      {
        text: "Aksi",
        align: "center",
        headerStyle: {
          width: "200px",
          textAlign: "center",
        },
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              {/* <Sidebar /> */}
              <Container>
                <Button variant="outline-primary" className="mr-2" block>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Button>
                &ensp;
                <Link to={`/admin/siswa/ubah/${row.siswa_id}`}>
                  <Button variant="outline-warning" className="mr-2" block>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Button>
                </Link>
                &ensp;
                <Button
                  variant="outline-danger"
                  onClick={() => this.handleRemove(row.siswa_id)}
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
        dataField: "siswa_nama",
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
              <Breadcrumb.Item>
                <Link to="/admin/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Data Siswa</Card.Title>
            <hr />
            <ToolkitProvider keyField="id" data={data} columns={columns} search>
              {(props) => (
                <div>
                  <div style={{ display: "flex" }}>
                    <Link to={"/admin/siswa/tambah/"}>
                      <Button variant="outline-primary" block>
                        Tambah
                      </Button>
                    </Link>
                    &ensp;
                    <Link to={"/admin/siswa/upload/"}>
                      <Button variant="outline-success" block>
                        Upload
                      </Button>
                    </Link>
                    &ensp;
                    <div style={{ display: "flex", marginLeft: "auto" }}>
                      <InputGroup>
                        <SearchBar
                          style={{ outline: "none" }}
                          placeholder="Cari Siswa ..."
                          {...props.searchProps}
                        />
                        <InputGroup.Text id="basic-addon1">
                          <FontAwesomeIcon icon={faSearch} />
                        </InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                  <br />
                  <BootstrapTable
                    keyField="id"
                    data={data}
                    columns={columns}
                    striped
                    hover
                    condensed
                    bordered={false}
                    noDataIndication="Data Tidak Ditemukan"
                    pagination={paginationFactory(options)}
                    {...props.baseProps}
                    defaultSorted={defaultSorted}
                  />
                </div>
              )}
            </ToolkitProvider>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
