function makeNoTransaksi(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 value = result;
 return value
}

module.exports = {
  getAll: (con, callback) => {
    con.query(
      "SELECT bebas_id, bebas_tagihan, bebas_total_bayar, siswa.siswa_id, siswa_nama, pembayaran_tipe, pos_nama, periode_mulai, periode_akhir FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id INNER JOIN periode ON periode.periode_id = pembayaran.periode_id",
      callback
    );
  },

  getById: (con, bebas_id, callback) => {
    con.query(
      `SELECT bebas_id, bebas_tagihan, bebas_total_bayar, siswa.siswa_id, siswa_nama, pembayaran_tipe, pos_nama, periode_mulai, periode_akhir FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id INNER JOIN periode ON periode.periode_id = pembayaran.periode_id WHERE bebas.bebas_id = ${bebas_id}`,
      callback
    );
  },

  getByNis: (con, siswa_nis, callback) => {
    con.query(
      `SELECT bebas_id, bebas_tagihan, bebas_total_bayar, siswa.siswa_id, siswa_nama, pembayaran_tipe, pos_nama, periode_mulai, periode_akhir FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id INNER JOIN periode ON periode.periode_id = pembayaran.periode_id WHERE siswa.siswa_nis = ${siswa_nis}`,
      callback
    );
  },

  add: (con, data, res) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      con.query(
        `SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,
        (err, rows) => {
          if (err) throw err;

          if (rows == 0)
            return res.json({
              error: true,
              message: "Id kelas tidak ditemukan.",
            });
          let siswa = rows.map((obj) => {
            return obj.siswa_id;
          });
          const a = Array.from(siswa).values();
          const b = a.next().value;

          con.query(
            `SELECT pembayaran_id FROM pembayaran WHERE pembayaran_id = '${data.pembayaran_id}'`,
            (err, rows) => {
              if (err) throw err;
              if (rows == 0)
                return res.json({
                  error: true,
                  message: "Id pembayaran bebas tidak ditemukan.",
                });
              let pembayaran = rows.map((obj) => {
                return obj.pembayaran_id;
              });
              const x = Array.from(pembayaran).values();
              const y = x.next().value;

              con.query(
                `SELECT siswa_id, pembayaran_id FROM bebas WHERE siswa_id = '${b}' AND pembayaran_id = '${y}' `,
                (err, rows) => {
                  if (err) throw err;
                  let siswa_id = rows.map((obj) => {
                    return obj.siswa_id;
                  });

                  let pembayaran_id = rows.map((obj) => {
                    return obj.pembayaran_id;
                  });

                  if (
                    Array.from(siswa_id).length == 0 &&
                    Array.from(pembayaran_id).length == 0
                  ) {
                    const jumlah_siswa = siswa.length;
                    for (let i = 0; i < jumlah_siswa; i++) {
                      con.query(
                        `INSERT INTO bebas SET siswa_id = '${siswa[i]}', pembayaran_id = '${data.pembayaran_id}', bebas_tagihan = '${data.tagihan}', bebas_total_bayar = '0' `
                      );
                    }
                  } else {
                    con.rollback();
                    return res.json({
                      error: true,
                      message:
                        "Seluruh siswa di kelas tersebut sudah di atur tagihannya untuk pembayaran ini",
                    });
                  }
                  con.commit((err) => {
                    if (err) con.rollback();
                    return res.json({
                      error: false,
                      message: "Set tarif berhasil",
                    });
                  });
                }
              );
            }
          );
        }
      );
    });
  },

  transaction: (con, bebas_id, data, res) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      con.query(
        `SELECT bebas_id, pos_nama FROM bebas INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id WHERE bebas_id = '${bebas_id}'`,
        (err, rows) => {
          if (err) throw err;

          const id_bebas = rows.map((obj) => {
            return obj.bebas_id;
          });

        const pos = rows[0].pos_nama

          if (bebas_id == id_bebas) {
            con.query(
              `SELECT bebas_tagihan, bebas_total_bayar FROM bebas WHERE bebas_id = '${bebas_id}'`,
              (err, rows) => {
                if (err) throw err;
                const tagihan = rows.map((obj) => {
                  return obj.bebas_tagihan;
                });
                const total_bayar = rows.map((obj) => {
                  return obj.bebas_total_bayar;
                });

                let sisa_tagihan = tagihan - total_bayar;

                if (data.nominal > sisa_tagihan) {
                  con.rollback();
                  return res.json({
                    error: true,
                    message: "Nominal yang anda masukkan melebihi tagihan",
                  });
                } else {
                    let tanggal = new Date()
                      .toJSON()
                      .slice(0, 10)
                      .replace(/-/g, "-");

                    let tgl = new Date(tanggal)
                    let d = tgl.getDate()
                    let m = tgl.toJSON().slice(5, 7)
                    let y = tgl.toJSON().slice(2, 4)
                    // noTransaksi = pos + "/" + makeNoTransaksi(8);
                    let noTransaksi = pos + "/" + d + m + y + "/" + makeNoTransaksi(6); 

                    con.query(
                      `INSERT INTO d_bebas SET no_transaksi = '${noTransaksi}',bebas_id = '${id_bebas}', d_bebas_bayar = '${data.nominal}', d_bebas_deskripsi = '${data.keterangan}', d_bebas_tanggal = '${tanggal}', admin_id = '${data.admin_id}'`,
                      (err) => {
                        if (err) throw err;

                        con.query(
                          `SELECT d_bebas_bayar FROM d_bebas WHERE bebas_id = '${bebas_id}'`,
                          (err, rows) => {
                            if (err) throw err;
                            let hasil = rows.map((obj) => {
                              return obj.d_bebas_bayar;
                            });
                            let total = hasil.reduce(function (a, b) {
                              return a + b;
                            }, 0);

                            // console.log(total)

                            con.query(
                              `UPDATE bebas SET bebas_total_bayar = '${total}' WHERE bebas_id = '${bebas_id}'`,
                              (err) => {
                                if (err) throw err;

                                con.commit((err) => {
                                  if (err) con.rollback();
                                  return res.json({
                                    error: false,
                                    message: "Pembayaran berhasil",
                                  });
                                });
                              }
                            );
                          }
                        );
                      }
                    );
                  
                }
              }
            );
          } else {
            con.rollback();
            return res.json({
              error: true,
              message: "Id pembayaran bebas tidak ditemukan.",
            });
          }
        }
      );
    });
  },

  invoice: (con, d_bebas_id, res) => {
    con.query(
      `SELECT no_transaksi, d_bebas_bayar, d_bebas_deskripsi, d_bebas_tanggal, admin_nama, kelas_nama, jurusan_nama, d_kelas_nama, siswa_nama, siswa_nis, pos_nama FROM d_bebas INNER JOIN bebas ON bebas.bebas_id = d_bebas.bebas_id INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON admin.admin_id = d_bebas.admin_id WHERE d_bebas.d_bebas_id = ${d_bebas_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Data pembayaran siswa tidak ditemukan.",
          });
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
        const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"]
        let d = new Date(rows[0].d_bebas_tanggal.toString())

        return res.json({
          no_tansaksi: rows[0].no_transaksi,
          d_bebas_bayar: rows[0].d_bebas_bayar,
          d_bebas_deskripsi: rows[0].d_bebas_deskripsi,
          tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
          admin_nama: rows[0].admin_nama,
          siswa_nama: rows[0].siswa_nama,
          siswa_nis: rows[0].siswa_nis,
          kelas_nama: rows[0].kelas_nama,
          jurusan_nama: rows[0].jurusan_nama,
          d_kelas_nama: rows[0].d_kelas_nama,
          pos_nama: rows[0].pos_nama,
        });
      }
    );
  },
};
