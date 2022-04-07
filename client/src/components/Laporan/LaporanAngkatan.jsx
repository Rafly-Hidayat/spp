import React, { Component } from "react";
import { Card, Col, Form, FormSelect, Row, Button, Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import BootstrapTable from "react-bootstrap-table-next";

export default class LaporanAngkatan extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Laporan Angkatan";
    this.validator = new SimpleReactValidator();

    this.state = {
      kelas: [],
      selected_kelas: "",
      data_bebas: [],
      total_bebas: [],
      data_bulanan: [],
      total_bulanan: [],
    };
  }
  componentDidMount() {
    axios.get("https://api-sps.my.id/kelas/").then((res) => {
      this.setState({
        kelas: res.data,
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      kelas_id: this.state.selected_kelas,
    };
    if (this.validator.allValid() &&this.state.selected_kelas !== "") {
      axios
        .post("https://api-sps.my.id/laporan/angkatan/bebas", data)
        .then((res) => {
          
          if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Data Tidak Ditemukan!`,
            });
            this.setState({
              data: ""
            })
          } else {
            this.setState({
              data_bebas: res.data.data,
              total_bebas: res.data,
            });
            Swal.fire({
              icon: "success",
              title: "Good Job!",
              text: `${res.data.message}`,
            });
          }
        });
      axios
        .post("https://api-sps.my.id/laporan/angkatan/bulanan", data)
        .then((res) => {
          
          if (res.data.error === true) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Data Tidak Ditemukan!`,
            });
            this.setState({
              data: ""
            })
          } else {
            
            this.setState({
              data_bulanan: res.data.data,
              total_bulanan: res.data,
            });
            Swal.fire({
              icon: "success",
              title: "Good Job!",
              text: `${res.data.message}`,
            });
          }
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    
    const data_bebas = this.state.data_bebas;
    const data_bulanan = this.state.data_bulanan;
    // const options = {
    //   paginationSize: 4,
    //   pageStartIndex: 1,
    //   // alwaysShowAllBtns: true, // Always show next and previous button
    //   // withFirstAndLast: false, // Hide the going to First and Last page button
    //   // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    //   // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    //   firstPageText: "First",
    //   prePageText: "Back",
    //   nextPageText: "Next",
    //   lastPageText: "Last",
    //   nextPageTitle: "First page",
    //   prePageTitle: "Pre page",
    //   firstPageTitle: "Next page",
    //   lastPageTitle: "Last page",
    //   disablePageTitle: true,
    //   sizePerPageList: [
    //     {
    //       text: "5",
    //       value: 5,
    //     },
    //     {
    //       text: "10",
    //       value: 10,
    //     },
    //     {
    //       text: "All",
    //       value: data.length,
    //     },
    //   ], // A numeric array is also available. the purpose of above example is custom the text
    // };
    // const selectRow = {
    //   mode: "radio",
    //   clickToSelect: true,
    // };
    const bebas = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "kelas_nama",
        text: "Kelas",
        sort: true,
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
      },
      {
        dataField: "sisa_tagihan",
        text: "Tagihan",
        sort: true,
        formatter: (cell, row) => {
          return <div>Rp. {row.sisa_tagihan.toLocaleString()}</div>;
        },
      },
    ];
    const bulanan = [
      {
        dataField: "siswa_nama",
        text: "Nama Siswa",
        sort: true,
      },
      {
        dataField: "kelas_nama",
        text: "Kelas",
        sort: true,
        formatter: (cellContent, row) => {
          return (
            <div>
              {`${row.kelas_nama} ${row.jurusan_nama} ${row.d_kelas_nama}`}
            </div>
          );
        },
      },
      {
        dataField: "sisa_bulan",
        text: "Sisa Bulan",
      },
      {
        dataField: "sisa_tagihan",
        text: "Tagihan",
        sort: true,
        formatter: (cell, row) => {
          return <div>Rp. {row.sisa_tagihan.toLocaleString()}</div>;
        },
      },
    ];
    const as = [];
    const total_bebas = this.state.total_bebas;
    const total_bulanan = this.state.total_bulanan;
    const sisa_bebas = [
      {
        text: "Total Sisa Tagihan Bebas:",
        headerStyle: (colum, colIndex) => {
          return { width: "67%", fontWeight: "light" };
        },
      },
      {
        text: total_bebas.sisa_tagihan_kelas
          ? `Rp. ${parseInt(total_bebas.sisa_tagihan_kelas).toLocaleString()}`
          : "Rp. 0",
      },
    ];
    const sisa_bulanan = [
      {
        text: "Total Sisa Tagihan Bulanan:",
        headerStyle: (colum, colIndex) => {
          return { width: "75%", fontWeight: "light" };
        },
      },
      {
        text: total_bulanan.sisa_tagihan_kelas
          ? `Rp. ${parseInt(total_bulanan.sisa_tagihan_kelas).toLocaleString()}`
          : "Rp. 0",
      },
    ];
    const defaultSort = {
      defaultSortName: "siswa_nama",
      defaultSortOrder: "asc",
    };

    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Laporan Angkatan</Card.Title>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <div className="d-flex">
                {/* <Row> */}
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Form.Label column sm="auto">
                        Kelas
                      </Form.Label>
                    </Col>
                    <Col>
                      <FormSelect
                        name="selected_kelas"
                        onChange={this.handleChange}
                      >
                        <option value="">=== Pilih Kelas ===</option>
                        {this.state.kelas.map((kelas) => {
                          return (
                            <option key={kelas.kelas_id} value={kelas.kelas_id}>
                              {kelas.kelas_nama}
                            </option>
                          );
                        })}
                      </FormSelect>
                      <div>
                        {this.validator.message(
                          "selected_kelas",
                          this.state.selected_kelas,
                          `required`,
                          {
                            className: "text-danger",
                            messages: {
                              required: "Pilih Kelas!",
                            },
                          }
                        )}
                      </div>
                    </Col>
                  </Form.Group>
                </Col>
                &ensp;
                <Col xs={6} md={4}>
                  <Form.Group as={Row} className="mb-3">
                    <Col md="auto">
                      <Button variant="outline-primary" type="submit">
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </div>
            </Form>
            <br />
            <Tabs
              defaultActiveKey="bulan"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="bulan" title="Bulanan">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={data_bulanan}
                  columns={bulanan}
                  striped
                  hover
                  condensed
                  bordered={false}
                  defaultSorted={defaultSort}
                  noDataIndication="Data tidak ditemukan"
                />
                <BootstrapTable
                  keyField="id"
                  data={as}
                  columns={sisa_bulanan}
                  bordered={false}
                />
              </Tab>
              <Tab eventKey="bebas" title="Bebas">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={data_bebas}
                  columns={bebas}
                  striped
                  hover
                  condensed
                  bordered={false}
                  noDataIndication="Data tidak ditemukan"
                  defaultSorted={defaultSort}
                />
                <BootstrapTable
                  keyField="id"
                  data={as}
                  columns={sisa_bebas}
                  bordered={false}
                />
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
