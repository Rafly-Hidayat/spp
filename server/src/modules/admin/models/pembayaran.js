module.exports = {
  getAll: (con, callback) => {
    con.query(
      "SELECT pembayaran_id, pembayaran_tipe, periode_mulai, periode_akhir, pos_nama FROM pembayaran INNER JOIN periode ON periode.periode_id = pembayaran.periode_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id",
      callback
    );
  },

  getById: (con, pembayaran_id, callback) => {
    con.query(
      `SELECT pembayaran_id, pembayaran_tipe, periode_mulai, periode_akhir, pos_nama FROM pembayaran INNER JOIN periode ON periode.periode_id = pembayaran.periode_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id WHERE pembayaran_id = ${pembayaran_id}`,
      callback
    );
  },

  add: (con, data, callback) => {
    con.query(
      `INSERT INTO pembayaran SET pembayaran_tipe = '${data.pembayaran_tipe}', periode_id = '${data.periode_id}', pos_id = '${data.pos_id}'`,
      callback
    );
  },

  update: (con, data, pembayaran_id, res, callback) => {
    con.query(
      `SELECT * FROM pembayaran WHERE pembayaran_id = ${pembayaran_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id pembyaran tidak ditemukan.",
          });
        con.query(
          `UPDATE pembayaran SET pembayaran_tipe = '${data.pembayaran_tipe}', periode_id = '${data.periode_id}', pos_id = '${data.pos_id}' WHERE pembayaran_id = ${pembayaran_id}`,
          callback
        );
      }
    );
  },

  delete: (con, pembayaran_id, res, callback) => {
    con.query(
      `SELECT * FROM pembayaran WHERE pembayaran_id = ${pembayaran_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id pembyaran tidak ditemukan.",
          });
        con.query(
          `DELETE FROM pembayaran WHERE pembayaran_id = ${pembayaran_id}`,
          callback
        );
      }
    );
  },
};
