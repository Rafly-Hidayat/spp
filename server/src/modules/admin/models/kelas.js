module.exports = {
  getAll: (con, callback) => {
    con.query("SELECT * FROM kelas", callback);
  },

  getById: (con, kelas_id, callback) => {
    con.query(`SELECT * FROM kelas WHERE kelas_id = ${kelas_id}`, callback);
  },

  add: (con, data, callback) => {
    con.query(
      `INSERT INTO kelas SET kelas_nama = '${data.kelas_nama}'`,
      callback
    );
  },

  getTotal: (con, callback) => {
    con.query("SELECT COUNT(*) FROM kelas", callback);
  },

  update: (con, data, kelas_id, res, callback) => {
    con.query(
      `SELECT * FROM kelas WHERE kelas_id = ${kelas_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "kelas_id tidak ditemukan.",
          });
        con.query(
          `UPDATE kelas SET kelas_nama = '${data.kelas_nama}' WHERE kelas_id = ${kelas_id}`,
          callback
        );
      }
    );
  },

  delete: (con, kelas_id, res, callback) => {
    con.query(
      `SELECT * FROM kelas WHERE kelas_id = ${kelas_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "kelas_id tidak ditemukan.",
          });
        con.query(`DELETE FROM kelas WHERE kelas_id = ${kelas_id}`, callback);
      }
    );
  },
};
