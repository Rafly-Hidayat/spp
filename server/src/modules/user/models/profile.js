module.exports = {

  getProfile: (con, res, siswa_id, callback) => {
    con.query(`SELECT siswa_id FROM siswa WHERE siswa_id = '${siswa_id}'`, (err, rows) => {
      if (err) throw err
      if (rows.length == 0) {
        return res.json({ error: true, message: 'Siswa tidak ditemukan' })
      } else {

        con.query(
          `SELECT siswa_id, siswa_nis, siswa_nama, siswa_img, siswa_password, siswa_gender, kelas_nama, jurusan_nama, d_kelas_nama FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id WHERE siswa_id = ${siswa_id}`,
          callback
        );
      }
    })
  },

  getTagihanBebas: (con, siswa_id, res, callback) => {
    con.query(
      `SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "siswa_id tidak ditemukan.",
          });
        con.query(
          `SELECT * FROM bebas WHERE siswa_id = ${siswa_id}`,
          (err, rows) => {
            if (err) throw err;
            if (rows.length == 0) {
              res.json({
                error: true,
                message: "Data tidak ditemukan",
              });
            } else {
              con.query(
                `SELECT SUM(bebas_tagihan - bebas_total_bayar) over (partition by bebas.pembayaran_id) as sisa_tagihan, bebas_tagihan, pembayaran_tipe, pos_nama, pos_deskripsi FROM bebas INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id WHERE siswa_id = ${siswa_id}`,
                callback
              );
            }
          }
        );
      }
    );
  },

  getTagihanBulanan: (con, siswa_id, res, callback) => {
    con.query(
      `SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "siswa_id tidak ditemukan.",
          });
        con.query(
          `SELECT * FROM bulanan WHERE siswa_id = ${siswa_id}`,
          (err, rows) => {
            if (err) throw err;
            if (rows.length == 0) {
              res.json({
                error: true,
                message: "Data tidak ditemukan",
              });
            } else {
              con.query(
                `SELECT bulanan_tagihan, month_nama, pembayaran_tipe, pos_nama, pos_deskripsi FROM bulanan INNER JOIN month ON month.month_id = bulanan.month_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bulanan.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id WHERE siswa_id = ${siswa_id} AND bulanan_status = 0 ORDER BY bulanan.month_id`,
                callback
              );
            }
          }
        );
      }
    );
  },

  getTagihanLunas: (con, siswa_id, res, callback) => {
    con.query(
      `SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "siswa_id tidak ditemukan.",
          });
        con.query(
          `SELECT siswa_id FROM bulanan WHERE siswa_id = ${siswa_id}`,
          (err, rows) => {
            if (err) throw err;
            if (rows.length == 0) {
              res.json({
                error: true,
                message: "Data tidak ditemukan",
              });
            } else {
              con.query(
                `SELECT bulanan_tagihan, month_nama, pembayaran_tipe, pos_nama, pos_deskripsi FROM bulanan INNER JOIN month ON month.month_id = bulanan.month_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bulanan.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id WHERE siswa_id = ${siswa_id} AND bulanan_status = 1 ORDER BY bulanan.month_id`,
                callback
              );
            }
          }
        );
      }
    );
  },

  editProfile: (con, res, data, siswa_password, siswa_id, callback) => {
    let file = data;
    let filename = file.name;
    file.mv("./public/images/" + filename, function (err) {
      if (err) {
        res.json({ error: true, message: "gagal mengubah foto profile" });
      } else {
        con.query(`SELECT siswa_id FROM siswa WHERE siswa_id = ${siswa_id}`, (err, rows) => {
          if (err) throw err;
          if (rows == 0) {
            return res.json({ error: true, message: "id siswa tidak ditemukan" });
          } else {
            con.query(
              `UPDATE siswa SET siswa_img = '${data.name}', siswa_password = '${siswa_password}' WHERE siswa_id = ${siswa_id}`,
              callback
            );

          }
        })
      }
    }
    );
  },


};
