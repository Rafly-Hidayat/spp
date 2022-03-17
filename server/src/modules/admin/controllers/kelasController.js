const kelas = require("../models/kelas");

module.exports = {
  getAll: (req, res) => {
    kelas.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    kelas.getById(req.con, req.params.kelas_id, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getTotal: (req, res) => {
    kelas.getTotal(req.con, (err, rows) => {
      if (err) throw err;
      res.json({ total: rows[0]["COUNT(*)"] });
    });
  },

  add: (req, res) => {
    kelas.add(req.con, req.body, (err, rows) => {
      if (err) throw err;
      res.json({ error: false, message: "berhasil menambahkan kelas." });
    });
  },

  update: (req, res) => {
    kelas.update(req.con, req.body, req.params.kelas_id, res, (err, rows) => {
      if (err) throw err;
      res.json({ error: false, message: "berhasil mengubah kelas." });
    });
  },

  delete: (req, res) => {
    kelas.delete(req.con, req.params.kelas_id, res, (err, rows) => {
      if (err) return res.send(err.sqlMessage, 400);
      res.json({ error: false, message: "berhasil menghapus kelas." });
    });
  },
};
