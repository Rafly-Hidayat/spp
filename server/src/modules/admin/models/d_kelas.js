module.exports = {
  getAll: (con, callback) => {
    con.query("SELECT * FROM d_kelas", callback);
  },

  getById: (con, d_kelas_id, callback) => {
    con.query(
      `SELECT * FROM d_kelas WHERE d_kelas_id = ${d_kelas_id}`,
      callback
    );
  },

  add: (con, data, callback) => {
    con.query(
      `INSERT INTO d_kelas SET d_kelas_nama = '${data.d_kelas_nama}'`,
      callback
    );
  },

  update: (con, data, d_kelas_id, res, callback) => {
    con.query(
      `SELECT * FROM d_kelas WHERE d_kelas_id = ${d_kelas_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id daftar kelas tidak ditemukan.",
          });
        con.query(
          `UPDATE d_kelas SET d_kelas_nama = '${data.d_kelas_nama}' WHERE d_kelas_id = ${d_kelas_id}`,
          callback
        );
      }
    );
  },

  delete: (con, d_kelas_id, res, callback) => {
    con.query(
      `SELECT * FROM d_kelas WHERE d_kelas_id = ${d_kelas_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id daftar kelas tidak ditemukan.",
          });
        con.query(
          `DELETE FROM d_kelas WHERE d_kelas_id = ${d_kelas_id}`,
          callback
        );
      }
    );
  },
};
