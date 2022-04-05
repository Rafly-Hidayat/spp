module.exports = {
  naikKelas: (con, data, res) => {
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

        Array.from(siswa).forEach((element, index) => {
          con.query(
            `UPDATE siswa SET kelas_id = '${data.ke_kelas}' WHERE siswa_id = '${siswa[index]}'`
          );
        });

        return res.json({ error: false, message: "Siswa berhasil naik kelas" });
      }
    );
  },

  // kelulusan masih belum bisa!
  lulus: (con, res, callback) => {
    con.query(
      `SELECT siswa_id FROM siswa WHERE kelas_id = '3' AND status = '1'`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length != 0) {
          con.query(`UPDATE siswa SET status = '0' WHERE kelas_id = '3'`, callback);
        } else {
          return res.json({
            error: true,
            message: "Siswa Kelas XII tidak ditemukan.",
          })
        }
      }
    );
  },
};
