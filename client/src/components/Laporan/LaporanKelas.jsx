import React, { Component } from "react";
import { Card, Col, Form, FormSelect, Row, Button } from "react-bootstrap";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";
import BootstrapTable from "react-bootstrap-table-next";

export default class LaporanKelas extends Component {
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
    this.state = {
      kelas: [],
      selected_kelas: "",
      data: [],
      total: [],
    };
  }
  componentDidMount() {
    axios.get("http://localhost:8000/kelas/").then((res) => {
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
    if (this.validator.allValid()) {
      axios
        .post("http://localhost:8000/laporan/angkatan/bulanan", data)
        .then((res) => {
          console.log(res.data);
          this.setState({
            data: res.data.data,
            total: res.data,
          });
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
    console.log(this.state.data);
    const data = this.state.data;
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
    const columns = [
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
    const as = [];
    const total = this.state.total;
    const sisa = [
      {
        text: "Total Sisa Tagihan Kelas:",
        headerStyle: (colum, colIndex) => {
          return { width: "67%", fontWeight: "light" };
        },
      },
      {
        // if sisa_tagihan_kelas is undefined, then it will be 0
        text: total.sisa_tagihan_kelas
          ? `Rp. ${parseInt(total.sisa_tagihan_kelas).toLocaleString()}`
          : null,
      },
    ];

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
                        <option value>=== Pilih Kelas ===</option>
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
                      <Button variant="primary" type="submit">
                        Cari
                      </Button>
                    </Col>
                  </Form.Group>
                </Col>
              </div>
            </Form>
            <br />
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columns}
              striped
              hover
              condensed
              bordered={false}
              noDataIndication="Data tidak ditemukan"
            />
             <BootstrapTable
              keyField="id"
              data={as}
              columns={sisa}
              bordered={false}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}
