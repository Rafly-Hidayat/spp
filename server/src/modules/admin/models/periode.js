module.exports = {
  getAll: (con, callback) => {
    con.query("SELECT * FROM periode", callback);
  },

  getById: (con, periode_id, callback) => {
    con.query(
      `SELECT * FROM periode WHERE periode_id = ${periode_id}`,
      callback
    );
  },

  add: (con, data, callback) => {
    const query = `INSERT INTO periode SET 
                                periode_mulai = '${data.periode_mulai}',
                                periode_akhir = '${data.periode_akhir}'`;
    con.query(query, callback);
  },

  update: (con, data, periode_id, res, callback) => {
    con.query(
      `SELECT * FROM periode WHERE periode_id = ${periode_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id tahun ajaran tidak ditemukan.",
          });
        const query = `UPDATE periode SET
                                    periode_mulai = '${data.periode_mulai}',
                                    periode_akhir = '${data.periode_akhir}'
                                    WHERE periode_id = ${periode_id}`;
        con.query(query, callback);
      }
    );
  },

  delete: (con, periode_id, res, callback) => {
    con.query(
      `SELECT * FROM periode WHERE periode_id = ${periode_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id tahun ajaran tidak ditemukan.",
          });
        con.query(
          `DELETE FROM periode WHERE periode_id = ${periode_id}`,
          callback
        );
      }
    );
  },
};
