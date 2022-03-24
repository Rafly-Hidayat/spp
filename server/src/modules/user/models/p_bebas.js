module.exports = {
  getP_bebas: (con, res, siswa_id, callback) => {
    con.query(
      `SELECT siswa_id FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) {
          return res.json({
            error: true,
            message: "siswa_id tidak ditemukan.",
          });
        } else {
          con.query(
            `SELECT * FROM bebas WHERE siswa_id = ${siswa_id}`,
            (err, rows) => {
              if (err) throw err;
              if (rows.length == 0) {
                return res.json({
                  error: true,
                  message: "data tidak ditemukan.",
                });
              } else {
                con.query(
                  `SELECT bebas.bebas_id, bebas_tagihan, bebas_total_bayar, siswa_nama, siswa_nis, pembayaran_tipe, periode_mulai, periode_akhir, pos_nama FROM bebas INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id
                            WHERE bebas.siswa_id = ${siswa_id}`,
                  callback
                );
              }
            }
          );
        }
      }
    );
  },

  getDetail: (con, res, siswa_id, callback) => {
    con.query(
      `SELECT siswa_id FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) {
          return res.json({
            error: true,
            message: "siswa_id tidak ditemukan.",
          });
        } else {
          con.query(
            `SELECT bebas_id FROM bebas WHERE siswa_id = ${siswa_id}`,
            (err, rows) => {
              if (err) throw err
              if (rows.length == 0) {
                return res.json({ error: true, message: "data tidak ditemukan." })
              } else {
                let bebas_id = rows[0].bebas_id

                con.query(`SELECT d_bebas_id, no_transaksi, d_bebas_bayar, d_bebas_deskripsi, d_bebas_tanggal, admin_nama, siswa_nama, siswa_nis, kelas_nama, jurusan_nama, d_kelas_nama FROM d_bebas INNER JOIN bebas ON bebas.bebas_id = d_bebas.bebas_id INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN kelas ON kelas.kelas_id = siswa.kelas_id INNER JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id INNER JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id INNER JOIN admin ON admin.admin_id = d_bebas.admin_id WHERE d_bebas.bebas_id = ${bebas_id}`, callback)
              }
            }
          );
        }
      }
    );
  },

  getInvoice: (con, res, siswa_id, d_bebas_id, callback) => {
    con.query(
      `SELECT siswa_id FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length == 0) {
          return res.json({
            error: true,
            message: "siswa_id tidak ditemukan.",
          });
        } else {
          con.query(
            `SELECT bebas_id FROM bebas WHERE siswa_id = ${siswa_id}`,
            (err, rows) => {
              if (err) throw err
              if (rows.length == 0) {
                return res.json({ error: true, message: "data tidak ditemukan." })
              } else {
                let bebas_id = rows[0].bebas_id

                con.query(`SELECT d_bebas_id, no_transaksi, d_bebas_bayar, d_bebas_deskripsi, d_bebas_tanggal, admin_nama, siswa_nama, siswa_nis, kelas_nama, jurusan_nama, d_kelas_nama FROM d_bebas INNER JOIN bebas ON bebas.bebas_id = d_bebas.bebas_id INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN kelas ON kelas.kelas_id = siswa.kelas_id INNER JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id INNER JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id INNER JOIN admin ON admin.admin_id = d_bebas.admin_id WHERE d_bebas.bebas_id = ${bebas_id} AND d_bebas.d_bebas_id = ${d_bebas_id}`, callback)
              }
            }
          );
        }
      }
    );
  }
};
