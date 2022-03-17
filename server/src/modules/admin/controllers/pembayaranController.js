const pembayaran = require("../models/pembayaran");

module.exports = {
  getAll: (req, res) => {
    pembayaran.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    pembayaran.getById(req.con, req.params.pembayaran_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({
          error: true,
          message: "Id pembyaran tidak ditemukan.",
        });
      res.json(rows);
    });
  },

  add: (req, res) => {
    pembayaran.add(req.con, req.body, (err) => {
      if (err) throw err;
      return res.json({
        error: false,
        message: "Berhasil tambah data pembayaran",
      });
    });
  },

  update: (req, res) => {
    pembayaran.update(
      req.con,
      req.body,
      req.params.pembayaran_id,
      res,
      (err) => {
        if (err) throw err;
        return res.json({
          error: false,
          message: "Berhasil ubah data pembayaran",
        });
      }
    );
  },

  delete: (req, res) => {
    pembayaran.delete(req.con, req.params.pembayaran_id, res, (err) => {
      if (err) return res.send(err.sqlMessage, 400);
      return res.json({
        error: false,
        message: "Berhasil hapus data pembayaran",
      });
    });
  },
};
