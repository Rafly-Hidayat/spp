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
                  `SELECT bebas.bebas_id, bebas_tagihan, bebas_total_bayar, siswa_nama, siswa_nis, pembayaran_tipe, periode_mulai, periode_akhir, pos_nama, d_bebas_deskripsi, d_bebas_tanggal, admin_nama FROM bebas INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN d_bebas ON bebas.bebas_id = d_bebas.bebas_id INNER JOIN admin ON d_bebas.admin_id = admin.admin_id
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
};
