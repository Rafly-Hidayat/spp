import React, { Component } from "react";
import "./CetakLaporan.css";

export default class CetakLaporanKelas extends Component {
  constructor(props) {
    super(props);
    document.title = "Laporan | Cetak";
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    const data = this.state.data;
    // const data_table = data[Object.keys(data)[0]];
    // const key = Object.keys(data)[0];
    let data_tagihan = [];
    for (let i = 0; i < 3; i++) {
      if (Object.values(data)[i]) {
        data_tagihan.push(Object.values(data)[i]);
      }
    }
    

    let data_arr = [];
    for (let i = 0; i < data_tagihan[0].length; i++) {
      let data_arr_temp = [];
      data_arr_temp.push(data_tagihan[0][i].siswa_nama);
      for (let j = 0; j < 3; j++) {
        // check if data_tagihan and data_bulan is not empty then push data
        if (data_tagihan[j] && data_tagihan[j][i]) {
          data_arr_temp.push(data_tagihan[j][i].sisa_bulan);
          data_arr_temp.push(data_tagihan[j][i].sisa_tagihan);
        } else {
          data_arr_temp.push("-");
          data_arr_temp.push("-");
        }
      }
      data_arr.push(data_arr_temp);
    }
    
    let arr = [];
    for (let i = 0; i < 3; i++) {
      if (Object.keys(data)[i] == null) {
        arr.push("-");
      } else {
        arr.push(Object.keys(data)[i]);
      }
    }
    
    return (
      <div
        className="wrapper"
        style={{
          boxShadow: "0px 0px 10px #888888",
          padding: "20px",
          margin: "20px",
          width: "95vw",
          height: "100%",
        }}
      >
        <div className="row">
          <div className="col-md-12">
            <table
              className="table"
              style={{
                border: "1px solid black",
                textAlign: "center",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{
                borderRight : "1px solid black"
              }}>
                <tr>
                  <th colSpan="100%">{data_tagihan[0][0].jurusan_nama} {data_tagihan[0][0].d_kelas_nama}</th>
                </tr>
                <tr>
                  <th width="20%"></th>
                  {arr.map((item) => {
                    return (
                      <th colSpan="2" width="15%">
                        {item}
                      </th>
                    );
                  })}
                </tr>
                <tr
                  style={{
                    borderRight: "1px solid black",
                    borderCollapse: "collapse",
                  }}
                >
                  <th>Nama</th>
                  <th>Sisa Bulan</th>
                  <th>Sisa Tagihan</th>
                  <th>Sisa Bulan</th>
                  <th>Sisa Tagihan</th>
                  <th>Sisa Bulan</th>
                  <th>Sisa Tagihan</th>
                </tr>
              </thead>
              <tbody>
                {data_arr.map((item) => {
                  return (
                    <tr>
                      <td className="text-left">{item[0]}</td>
                      <td>{item[1]}</td>
                      <td>{item[2]}</td>
                      <td>{item[3]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td>{item[6]}</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
