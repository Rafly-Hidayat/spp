const jurusan = require("../models/jurusan");

module.exports = {
  getAll: (req, res) => {
    jurusan.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    jurusan.getById(req.con, req.params.jurusan_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({
          error: true,
          message: "Id jurusan tidak ditemukan.",
        });
      res.json(rows);
    });
  },

  getTotal: (req, res) => {
    jurusan.getTotal(req.con, (err, rows) => {
      if (err) throw err;
      res.json({ total: rows[0]["COUNT(*)"] });
    });
  },

  add: (req, res) => {
    jurusan.add(req.con, req.body, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil tambah data jurusan kelas",
      });
    });
  },

  update: (req, res) => {
    jurusan.update(req.con, req.body, req.params.jurusan_id, res, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil ubah data jurusan kelas",
      });
    });
  },

  delete: (req, res) => {
    jurusan.delete(req.con, req.params.jurusan_id, res, (err) => {
      if (err) return res.send(err.sqlMessage, 400);
      return res.json({
        error: false,
        message: "Berhasil hapus data jurusan kelas",
      });
    });
  },
};
