import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from "sweetalert2";
import ToolkitProvider, {Search,} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";


export default class DataSiswa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  getSiswa = () => {
    axios.get("http://localhost:8000/siswa/").then((res) => {
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
          .delete(`http://localhost:8000/hapus/siswa/${siswa_id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: `${res.data}`,
            });
          })
          .catch((err) => {
            console.log(err);
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
    const selectRow = {
      mode: "radio",
      clickToSelect: true,
    };
    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      // alwaysShowAllBtns: true, // Always show next and previous button
      // withFirstAndLast: false, // Hide the going to First and Last page button
      // hideSizePerPage: true, // Hide the sizePerPage dropdown always
      // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      disablePageTitle: true,
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: data.length
      }] // A numeric array is also available. the purpose of above example is custom the text
    };
    const columns = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "siswa_nis",
        text: "NIS",
        align: "center",
        headerAlign: "center",
      },
      {
        dataField: "siswa_gender",
        text: "Jenis Kelamin",
        align: "center",
        headerAlign: "center",
      },
      {
        dataField: "kelas_nama",
        text: "Kelas",
        align: "center",
        headerAlign: "center",
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
      },
      {
        dataField: "Aksi",
        text: "Aksi",
        align: "center",
        // make delete and update button
        formatter: (cellContent, row) => {
          return (
            <div>
              {/* <Sidebar /> */}
              <Container>
                <Link to={`/admin/siswa/ubah/${row.siswa_id}`}>
                      <Button variant="outline-warning" className="mr-2" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>&ensp;
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
              <Breadcrumb.Item><Link to="/admin/">Home</Link></Breadcrumb.Item>
              <Breadcrumb.Item active>Data</Breadcrumb.Item>
            </Breadcrumb>
          </Card.Body>
        </Card>
        <br/>
        <Card>
          <Card.Body>
            <ToolkitProvider keyField="id" data={data} columns={columns} search>
              {(props) => (
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Link to={"/admin/siswa/tambah/"}>
                    <Button variant="outline-primary" block="">
                      Tambah
                    </Button></Link>
                      <div className="float-right" style={{display: 'flex'}}>
                        <InputGroup>
                        <SearchBar style={{ outline: 'none' }} placeholder='Cari Siswa ...' {...props.searchProps} />
                      <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                        </InputGroup>
                      </div>
                      </div>
                    <br/>
                  <BootstrapTable
                    keyField="id"
                    data={data}
                    columns={columns}
                    striped
                    hover
                    condensed
                    bordered={false}
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
