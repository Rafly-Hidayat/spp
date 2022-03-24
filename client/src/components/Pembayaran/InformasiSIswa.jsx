import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Table, Tabs, Tab, Badge } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";

export default class InformasiSIswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      databulanan: [],
      nis: "",
      nama: "",
      jenis_kelamin: "",
      siswa_id: "",
      bebas_id: "",
      periode: this.props.periode,
    };
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getData = () => {
    const id = this.props.nis;
    axios.get(`http://localhost:8000/siswa_nis/${id}`).then((res) => {
      console.log(res);
      if (res.data[0].siswa_id === undefined) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "NIS Siswa tidak ditemukan",
        });
        this.setState({
          nis: "",
          nama: "",
          jenis_kelamin: "",
          siswa_id: "",
          periode: "",
          data: "",
          databulanan: "",
        });
      } else {
        this.setState({
          nis: res.data[0].siswa_nis,
          nama: res.data[0].siswa_nama,
          jenis_kelamin: res.data[0].siswa_gender,
          siswa_id: res.data[0].siswa_id,
          periode: this.props.periode,
        });
        const id = this.props.nis;
        axios.get(`http://localhost:8000/bebas/${id}`).then((res) => {
          if (res.data[0] === undefined) {
            this.setState({
              data: "",
            });
            console.log(this.state.bebas_id);
          } else {
            this.setState({
              data: res.data,
              bebas_id: res.data[0].bebas_id,
            });
          }
        });
        axios.get(`http://localhost:8000/bulanan/${id}`).then((res) => {
          console.log(res);
          if (res.data[0] === undefined) {
            this.setState({
              databulanan: "",
            });
          } else {
            this.setState({
              databulanan: res.data,
            });
          }
        });
      }
    });
  };

  componentDidMount() {
    this.getData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.nis !== this.props.nis) {
      if (this.props.nis.length === 9) {
        this.getData();
      }
    }
  }

  render() {
    console.log(this.state.periode)
    const data = this.state.data;
    const databulanan = this.state.databulanan;
    const column = [
      {
        dataField: "month_id",
        text: "No",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "80px" };
        },
      },
      {
        dataField: "pos_nama",
        text: "Deskripsi",
      },
      {
        dataField: "month_nama",
        text: "Bulan",
      },
      {
        text: "Tagihan",
        formatter: (cell, row) => {
          return <div>Rp. {row.bulanan_tagihan.toLocaleString("id")}</div>;
        },
      },
      {
        dataField: "bulanan_status",
        text: "Status",
        // get bulanan status
        formatter: (cell, row) => {
          if (row.bulanan_status === 1) {
            return (
              <div>
                <Badge bg="success">Lunas</Badge>
              </div>
            );
          } else {
            return (
              <div>
                <Badge bg="danger">Belum Lunas</Badge>
              </div>
            );
          }
        },
      },
      {
        text: "Bayar",
        formatter: (cell, row) => {
          if (row.bulanan_status === 1) {
            return (
              <div>
                <Link to={`/admin/invoice/${row.bulanan_id}`}>
                <Button variant="outline-warning">Cetak</Button>
                </Link>
              </div>
            );
          } else {
            return (
              <div>
                 <Link to={{
                  pathname : `/admin/pembayaran_bulan/tambah/${row.bulanan_id}`, 
                  state :{
                    nis : `${this.state.nis}`, 
                    periode : `${this.state.periode}`
                }}}>
                  <Button variant="outline-primary">Bayar</Button>
                </Link>
              </div>
            );
          }
        },
      },
    ];
    const columns = [
      {
        dataField: "pos_nama",
        text: "Tipe Pembayaran",
      },
      {
        text: "Jumlah Tagihan",
        formatter: (cell, row) => {
          return <div>Rp. {row.bebas_tagihan.toLocaleString("id")}</div>;
        },
      },
      {
        text: "Jumlah yang dibayar",
        formatter: (cell, row) => {
          return <div>Rp. {row.bebas_total_bayar.toLocaleString("id")}</div>;
        },
      },
      {
        dataField: "bebas_tagihan",
        text: "Sisa Tagihan",
        formatter: (cell, row) => {
          // count bebas_tagihan minus bebas_total_bayar and turn to LocaleString("id")
          return (
            <div>
              Rp.{" "}
              {(
                parseInt(row.bebas_tagihan) - parseInt(row.bebas_total_bayar)
              ).toLocaleString("id")}
            </div>
          );
        },
      },
      {
        text: "Bayar",
        formatter: (cell, row) => {
          return (
            <Link to={{pathname : `/admin/pembayaran/tambah/${row.bebas_id}`, state : {nis:`${this.state.nis}`, periode : `${this.state.nis}`}}}>
              <Button variant="outline-primary">Bayar</Button>
            </Link>
          );
        },
      },
    ];
    return (
      <div>
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Card.Title>Informasi Siswa</Card.Title>
            <hr />
            <Table striped hover size="sm">
              <tbody>
                <tr>
                  <td>Tahun Ajaran</td>
                  <td>{`${this.state.periode}`}</td>
                </tr>
                <tr>
                  <td>NIS</td>
                  <td>{`${this.state.nis}`}</td>
                </tr>
                <tr>
                  <td>Nama Siswa</td>
                  <td>{`${this.state.nama}`}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td>{`${this.state.jenis_kelamin}`}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ color: "black" }}>
          <Card.Body>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="profile" title="Bulanan">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={databulanan}
                  columns={column}
                  striped
                  noDataIndication={() => "Data tidak ditemukan"}
                  hover
                  condensed
                  bordered={false}
                />
              </Tab>
              <Tab eventKey="home" title="Bebas">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={data}
                  columns={columns}
                  striped
                  noDataIndication={() => "Data tidak ditemukan"}
                  hover
                  condensed
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
