import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Container, Col, Button, Card, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import paginationFactory from 'react-bootstrap-table2-paginator';


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
    });
  };

  handleRemove = (siswa_id) => {
    axios
      .delete(`http://localhost:8000/hapus/siswa/${siswa_id}`)
      .then((res) => { })
      .catch((err) => { });
    this.getSiswa();
  };

  
  componentDidMount() {
    this.getSiswa();
  }
  render() {
    
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
                <Row>
                  <Col md={3}>
                    <Link to={`/admin/siswa/ubah/${row.siswa_id}`}>
                      <Button variant="outline-warning" className="mr-2" block>
                        <FontAwesomeIcon icon={faUserEdit} />
                      </Button>
                    </Link>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="outline-danger"
                      onClick={() => this.handleRemove(row.siswa_id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Col>
                </Row>
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
        <br></br>
              <br/>
        <Card>
          <Card.Body>
            <Link to={"/admin/siswa/tambah/"}>
              <Button className="mr-2" variant="outline-primary" block="">
                Tambah
              </Button>
            </Link>
            <hr />
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              defaultSorted={defaultSorted}
              striped
              hover
              condensed
              bordered={false}
              pagination={ paginationFactory(options) }
              // selectRow={ selectRow }
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
