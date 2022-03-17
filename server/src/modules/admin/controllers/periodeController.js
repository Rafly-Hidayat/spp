const periode = require("../models/periode");

module.exports = {
  getAll: (req, res) => {
    periode.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    periode.getById(req.con, req.params.periode_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({
          error: true,
          message: "Id tahun ajaran tidak ditemukan.",
        });
      res.json(rows);
    });
  },

  add: (req, res) => {
    periode.add(req.con, req.body, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil tambah data tahun ajaran",
      });
    });
  },

  update: (req, res) => {
    periode.update(req.con, req.body, req.params.periode_id, res, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil ubah data tahun ajaran",
      });
    });
  },

  delete: (req, res) => {
    periode.delete(req.con, req.params.periode_id, res, (err) => {
      if (err) return res.send(err.sqlMessage, 400);
      return res.json({
        error: false,
        message: "Berhasil hapus data tahun ajaran",
      });
    });
  },
};
