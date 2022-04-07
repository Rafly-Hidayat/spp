import React, { Component } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";
import Icon from "../Assets/Invoice/Sukses.svg";
import watermark from "../Assets/Invoice/Watermark.svg";
import { Link, } from "react-router-dom";
import { Button } from 'react-bootstrap';
import InvoiceOutput from '../PembayaranBebas/InvoiceOutput'

export default class InvoiceBebas extends Component {
  constructor(props) {
    const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    super(props);
    
    this.state = {
      id: id,
      no_transaksi: "",
      d_bebas_bayar: "",
      d_bebas_deskripsi: "",
      d_bebas_tanggal: "",
      admin_nama: "",
      siswa_nama: "",
      siswa_nis: "",
      kelas_nama: "",
      jurusan_nama: "",
      d_kelas_nama: "",
      d_bebas_id: this.props.match.params.d_bebas_id,
    };
  }
  componentDidMount = () => {
    
      const id = JSON.parse(localStorage.getItem("dataSiswa")).id;
    axios.get(`https://api-sps.my.id/user/detail/bebas/${id}/${this.state.d_bebas_id}`).then((res) => {
      
      if (res.data.error === true) {
        this.setState({
          no_transaksi: "",
          d_bebas_bayar: "",
          d_bebas_deskripsi: "",
          d_bebas_tanggal: "",
          admin_nama: "",
          siswa_nama: "",
          siswa_nis: "",
          kelas_nama: "",
          jurusan_nama: "",
          d_kelas_nama: "",
        });
      } else {
        this.setState({
          no_transaksi: res.data[0].no_transaksi,
          d_bebas_bayar: res.data[0].d_bebas_bayar,
          d_bebas_deskripsi: res.data[0].d_bebas_deskripsi,
          d_bebas_tanggal: res.data[0].d_bebas_tanggal,
          admin_nama: res.data[0].admin_nama,
          siswa_nama: res.data[0].siswa_nama,
          siswa_nis: res.data[0].siswa_nis,
          kelas_nama: res.data[0].kelas_nama,
          jurusan_nama: res.data[0].jurusan_nama,
          d_kelas_nama: res.data[0].d_kelas_nama,
        });
      }
    });
  };
  render() {
      
    return (
      <div>
        <div
          className="wrap m-4 "
          style={{
            boxShadow: "0 0 16px rgba(0, 0, 0, 0.5)",
            padding: "10px 0",
          }}
        >
          <img
            src={watermark}
            alt=""
            style={{
              left: "25%",
              top: "30%",
              position: "absolute",
              objectFit: "cover",
              width: "50%",
              opacity: "0.5",
            }}
          />

          <div
            className="content-invoice"
            style={{ position: "relative", zIndex: "1" }}
          >
            <div className="head" style={{ borderBox: "1px solid black" }}>
              <img
                src={Icon}
                alt=""
                style={{
                  width: "16%",
                  height: "16%",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  paddingTop: "10px",
                }}
              />
              <br />
              <h6 className="text-center " style={{ fontWeight: "800" }}>
                Terima Kasih
              </h6>
              <h6 className="text-center" style={{ fontWeight: "500" }}>
                Pembayaran anda telah berhasil
              </h6>
            </div>
            <hr />
            <br />
            <div className="container">
              <div
                className="no-tgl d-flex "
                style={{
                  justifyContent: "space-between",
                  marginBottom: "-8px",
                }}
              >
                <div className="nomor">
                  <h6 style={{ fontWeight: "700" }}>No. Pembayaran</h6>
                  <p style={{ marginTop: "14px" }}>{this.state.no_transaksi}</p>
                </div>
                <div className="tanggal " style={{ textAlign: "right" }}>
                  <h6 style={{ fontWeight: "700" }}>Tgl. Pembayaran</h6>
                  <p style={{ marginTop: "14px" }}>{this.state.d_bebas_tanggal}</p>
                </div>
              </div>
              <hr />
              <div
                className="nama-nis d-flex "
                style={{
                  justifyContent: "space-between",
                  marginBottom: "-8px",
                }}
              >
                <div className="nama">
                  <h6 style={{ fontWeight: "700" }}>Nama Lengkap</h6>
                  <p style={{ marginTop: "14px" }}>{this.state.siswa_nama}</p>
                  <p style={{ marginTop: "14px" }}>{this.state.kelas_nama + " " + this.state.jurusan_nama + " " + this.state.d_kelas_nama}</p>
                </div>
                <div className="kelas">
                  <h6 style={{ fontWeight: "700", textAlign: "right" }}>NIS</h6>
                  <p style={{ marginTop: "14px" }}>{this.state.siswa_nis}</p>
                </div>
              </div>
              <hr />
              <div
                className="desk-total d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "-4px",
                }}
              >
                <div className="nama">
                  <h6 style={{ fontWeight: "700" }}>Deskripsi</h6>
                </div>
                <div className="kelas">
                  <h6 style={{ fontWeight: "700" }}>Subtotal</h6>
                </div>
              </div>
              <hr />
              <div
                className="desk-total-isi d-flex"
                style={{
                  justifyContent: "space-between",
                  marginBottom: "-2px",
                }}
              >
                <div className="nama-isi">
                  <p>{this.state.d_bebas_deskripsi}</p>
                </div>
                <div className="kelas-isi">
                  <p>{this.state.d_bebas_bayar}</p>
                </div>
              </div>
              <hr />
              <div
                className="total d-flex"
                style={{
                  justifyContent: "space-between",
                  marginTop: "10px",
                  marginBottom: "-18px",
                }}
              >
                <h6 style={{ fontWeight: "700" }}>Total</h6>
                <p style={{ fontWeight: "700" }}>{this.state.d_bebas_bayar}</p>
              </div>
              <hr />
              <div
                className="invoice-footer d-flex"
                style={{ justifyContent: "space-between", color: "gray" }}
              >
                <div className="alamat">
                  <h6 style={{ fontSize: "9px", fontWeight: "600" }}>
                    SMKN 2 KOTA BEKASI
                  </h6>
                  <p
                    style={{
                      maxWidth: "240px",
                      letterSpacing: "0.2px",
                      fontSize: "8px",
                      fontWeight: "500",
                    }}
                  >
                    Jl. Lap. Bola Rw. Butun, RT.001/RW.006, Ciketing Udik, Kec.
                    Bantar Gebang, Kota Bks, Jawa Barat 17153
                  </p>
                </div>
                <div className="email">
                  <p
                    style={{
                      maxWidth: "240px",
                      letterSpacing: "0.1px",
                      fontSize: "8px",
                      fontWeight: "500",
                      paddingTop: "16px",
                    }}
                  >
                    digitechpayment@gmail.com
                  </p>
                </div>
              </div>

              <br />
              <div className="btn-print-download ">
                <ReactToPrint
                  trigger={() => <Button variant="primary">Print this out!</Button>}
                  content={() => this.componentRef}
                  
                />
                <div style={{display: "none"}}>

                <InvoiceOutput ref={el => (this.componentRef = el)} id = {this.state.d_bebas_id} />
                <Button variant="danger">Back</Button>
                </div>
                &ensp;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
