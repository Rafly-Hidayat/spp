const d_kelas = require("../models/d_kelas");

module.exports = {
  getAll: (req, res) => {
    d_kelas.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    d_kelas.getById(req.con, req.params.d_kelas_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({
          error: true,
          message: "Id daftar kelas tidak ditemukan.",
        });
      res.json(rows);
    });
  },

  add: (req, res) => {
    d_kelas.add(req.con, req.body, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil tambah data daftar kelas",
      });
    });
  },

  update: (req, res) => {
    d_kelas.update(req.con, req.body, req.params.d_kelas_id, res, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil ubah data daftar kelas",
      });
    });
  },

  delete: (req, res) => {
    d_kelas.delete(req.con, req.params.d_kelas_id, res, (err) => {
      if (err) return res.send(err.sqlMessage, 400);
      return res.json({
        error: false,
        message: "Berhasil hapus data daftar kelas",
      });
    });
  },
};
