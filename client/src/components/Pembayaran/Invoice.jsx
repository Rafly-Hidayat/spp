import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import axios from "axios";
import Icon from "../Assets/Invoice/Sukses.svg";
import watermark from "../Assets/Invoice/Watermark.svg";

import InvoicePrint from "./InvoicePrint";
import { Link } from "react-router-dom";

// import './Invoice.css'
export default class Invoice extends Component {
  constructor(props) {
    super(props);
    document.title = "Admin | Cetak Pembayaran";
    this.state = {
      id: this.props.match.params.id,
      tanggal: "",
      siswa_nama: "",
      siswa_nis: "",
      pos_nama: "",
      month_nama: "",
      nis:"",
      periode:"",
      total:""
    };
  }
  componentDidMount() {
    axios
      .get(`https://api-sps.my.id/invoice/bulanan/${this.state.id}`)
      .then((res) => {
        
        if (res.data.error === true) {
          this.setState({
            tanggal: "",
            siswa_nama: "",
            siswa_nis: "",
            pos_nama: "",
            month_nama: "",
            total: "",
          });
        } else {
          this.setState({
            tanggal: res.data.tanggal,
            siswa_nama: res.data.siswa_nama,
            siswa_nis: res.data.siswa_nis,
            pos_nama: res.data.pos_nama,
            month_nama: res.data.month_nama,
            no_transaksi: res.data.no_transaksi,
            total: res.data.total,
          });
        }
      });

      if(this.props.location){
        this.setState({
          nis : this.props.location.state.nis,
          periode : this.props.location.state.periode
        })
      }
  }
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
                  <p style={{ marginTop: "14px" }}>{this.state.tanggal}</p>
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
                  <p>{this.state.pos_nama + " " + this.state.month_nama}</p>
                </div>
                <div className="kelas-isi">
                  <p>Rp {this.state.total.toLocaleString("id")}</p>
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
                <p style={{ fontWeight: "700" }}>Rp {this.state.total.toLocaleString("id")}</p>
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
                  trigger={() => (
                    <Button variant="primary">Print this out!</Button>
                  )}
                  content={() => this.componentRef}
                />
                <div style={{ display: "none" }}>
                  <InvoicePrint
                    bulanan_id={this.state.id}
                    ref={(el) => (this.componentRef = el)}
                  />
                </div>
                {/* <InvoicePrint ref={el => (this.componentRef = el)} /> */}
                &ensp;
                <Link to={{pathname: `/admin/pembayaran`, state: {nis: `${this.state.nis}`, periode : `${this.state.periode}`}}}>
                  <Button variant="danger">Kembali</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
