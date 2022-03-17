module.exports = {
  getAll: (con, callback) => {
    con.query("SELECT * FROM jurusan", callback);
  },

  getById: (con, jurusan_id, callback) => {
    con.query(
      `SELECT * FROM jurusan WHERE jurusan_id = ${jurusan_id}`,
      callback
    );
  },

  getTotal: (con, callback) => {
    con.query("SELECT COUNT(*) FROM jurusan", callback);
  },

  add: (con, data, callback) => {
    con.query(
      `INSERT INTO jurusan SET jurusan_nama = '${data.jurusan_nama}'`,
      callback
    );
  },

  update: (con, data, jurusan_id, res, callback) => {
    con.query(
      `SELECT * FROM jurusan WHERE jurusan_id = ${jurusan_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id jurusan tidak ditemukan.",
          });
        con.query(
          `UPDATE jurusan SET jurusan_nama = '${data.jurusan_nama}' WHERE jurusan_id = ${jurusan_id}`,
          callback
        );
      }
    );
  },

  delete: (con, jurusan_id, res, callback) => {
    con.query(
      `SELECT * FROM jurusan WHERE jurusan_id = ${jurusan_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id jurusan tidak ditemukan.",
          });
        con.query(
          `DELETE FROM jurusan WHERE jurusan_id = ${jurusan_id}`,
          callback
        );
      }
    );
  },
};
