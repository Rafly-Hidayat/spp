const pos = require("../models/pos");

module.exports = {
  getAll: (req, res) => {
    pos.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    pos.getById(req.con, req.params.pos_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "Id pos tidak ditemukan." });
      res.json(rows);
    });
  },

  getTotal: (req, res) => {
    pos.getTotal(req.con, (err, rows) => {
      if (err) throw err;
      res.json({ total: rows[0]["COUNT(*)"] });
    });
  },

  add: (req, res) => {
    pos.add(req.con, req.body, (err) => {
      if (err) throw err;
      return res.json({ error: false, message: "Berhasil tambah data pos" });
    });
  },

  update: (req, res) => {
    pos.update(req.con, req.body, req.params.pos_id, res, (err) => {
      if (err) throw err;
      return res.json({ error: false, message: "Berhasil ubah data pos" });
    });
  },

  delete: (req, res) => {
    pos.delete(req.con, req.params.pos_id, res, (err) => {
      if (err) return res.send(err.sqlMessage, 400);
      return res.json({ error: false, message: "Berhasil hapus data pos" });
    });
  },
};
