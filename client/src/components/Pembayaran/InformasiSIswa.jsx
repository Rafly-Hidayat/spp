import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Table, Tabs, Tab, Badge } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Swal from "sweetalert2";
import {faInfo, faPrint} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class InformasiSIswa extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Pembayaran";
    this.state = {
      data: [],
      databulanan: [],
      nis: "",
      nama: "",
      jenis_kelamin: "",
      siswa_id: "",
      bebas_id: "",
      periode: this.props.periode,
      details : false,
      data_details : [],
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
    // const idp = this.props.periodes.id;
    
    axios.get(`https://api-sps.my.id/siswa_nis/${id}`).then((res) => {
      
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
        const nis = this.props.nis;
        const periode = this.props.periode;
        axios.get(`https://api-sps.my.id/bebas/${nis}/${periode}`).then((res) => {
          if (res.data[0] === undefined) {
            this.setState({
              data: "",
            });
            
          } else {
            this.setState({
              data: res.data,
              bebas_id: res.data[0].bebas_id,
            });
          }
        });
        axios.get(`https://api-sps.my.id/bulanan/${nis}/${periode}`).then((res) => {
          
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

  getDetails = () => {
    axios.get(`https://api-sps.my.id/user/detail/bebas/${this.state.siswa_id}`).then((res) => {
      
      if (res.data.error === true){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data Bebas tidak ditemukan",
        })
        // this.setState({
        //   // details : !this.state.details,
        // })
      } else {
        this.setState({
          details : !this.state.details,
          data_details : res.data,
        })
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
    
    const data = this.state.data;
    const databulanan = this.state.databulanan;
    const defaultSorted = [{
      dataField: 'month_id',
      order: 'asc'
    }];
    const data_details = this.state.data_details;
    
    const detail = [
      {
        dataField: "no_transaksi",
        text: "No Transaksi",
      },
      {
        dataField: "d_bebas_deskripsi",
        text: "Deskripsi",
      },
      {
        dataField: "d_bebas_bayar",
        text: "Nominal",
      },
      {
        dataField: "d_bebas_tanggal",
        text: "Tanggal",
      },
      {
        dataField: "admin_id",
        text: "Admin",
        formatter: (cell, row) => {
          if (row.admin_id === "1") {
            return "admin";
          } else {
            return "admin2";
          }
        },
      },
      {
        dataField: "d_bebas_id",
        text: "Action",
        formatter: (cell, row) => {
          return (
            <div>
              <Link to={{pathname : `/admin/invoice/bebas/${this.state.siswa_id}/${row.d_bebas_id}`, state : {nis:`${this.state.nis}`, periode : `${this.state.periode}`}}}>
                <Button variant="outline-warning" size="sm">
                  <FontAwesomeIcon icon={faPrint} /> Cetak
                </Button>
              </Link>
            </div>
          );
        },
      },
    ];

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
                 <Link to={{
                  pathname : `/admin/invoice/${row.bulanan_id}`, 
                  state :{
                    nis : `${this.state.nis}`, 
                    periode : `${this.state.periode}`
                }}}>
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
        text: "Tipe Pembayaran",
        formatter: (cell, row) => {
          return (
            <div>
              {`${row.pos_nama} - T.A ${row.periode_mulai}/${row.periode_akhir}`}
            </div>
          );
        }
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
            <div>
            <Button onClick={this.getDetails} variant="outline-success">
                <FontAwesomeIcon icon={faInfo} /> Info
              </Button>&ensp;
            <Link to={{pathname : `/admin/pembayaran/tambah/${row.bebas_id}`, state : {nis:`${this.state.nis}`, periode : `${this.state.periode}`}}}>
              <Button variant="outline-primary">Bayar</Button>
            </Link>
            </div>
          );
        },
      },
    ];
    let gender = this.state.jenis_kelamin
    gender === 'P' ? gender = "Perempuan" : gender = "Laki-laki"
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
                  <td>{gender}</td>
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
                  defaultSorted={defaultSorted}
                />
              </Tab>
              <Tab eventKey="home" title="Bebas">
                <br />
                <br />
                <BootstrapTable
                  keyField="id"
                  data={this.state.details === false ? data : data_details}
                  columns={this.state.details === false ? columns : detail}
                  striped
                  noDataIndication={() => "Data tidak ditemukan"}
                  hover
                  condensed
                  bordered={false}
                />
                {this.state.details === false ? null : <Button onClick={()=> {this.setState({details : false})}}>Kembali</Button> }
                {/* {this.state.details === false ? <Button>Kembali</Button> : null} */}
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
