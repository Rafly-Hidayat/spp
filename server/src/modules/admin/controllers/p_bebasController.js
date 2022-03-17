const bebas = require("../models/p_bebas");

module.exports = {
  getAll: (req, res) => {
    bebas.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    bebas.getById(req.con, req.params.bebas_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({
          error: true,
          message: "Id pembayaran bebas tidak ditemukan.",
        });
      res.json(rows);
    });
  },

  getByNis: (req, res) => {
    bebas.getByNis(req.con, req.params.siswa_nis, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "Nis Siswa tidak ditemukan." });
      res.json(rows);
    });
  },

  add: (req, res) => {
    bebas.add(req.con, req.body, res);
  },

  transaction: (req, res) => {
    bebas.transaction(req.con, req.params.bebas_id, req.body, res);
  },

  invoice: (req, res) => {
    bebas.invoice(req.con, req.params.d_bebas_id, res);
  },
};
