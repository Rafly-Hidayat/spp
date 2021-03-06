const kenaikan_kelas = require("../models/kenaikan_kelas");

module.exports = {
  naik_kelas: (req, res) => {
    kenaikan_kelas.naikKelas(req.con, req.body, res);
  },

  lulus: (req, res) => {
    kenaikan_kelas.lulus(req.con, res, (err) => {
      !err ? res.json({ error: false, message: "Siswa berhasil Lulus!" }) : res.json({ error: true, message: err })
    });
  },
};
