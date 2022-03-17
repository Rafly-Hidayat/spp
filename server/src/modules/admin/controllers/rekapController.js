const rekap = require("../models/rekap");

module.exports = {
  harianBulanan: (req, res) => {
    rekap.harianBulanan(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  harianBebas: (req, res) => {
    rekap.harianBebas(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  laporanBulanan: (req, res) => {
    rekap.laporanBulanan(req.con, req.body, (err, rows) => {
      if (err) throw err;
      let data = [];
      Array.from(rows).forEach((element, index) => {
        data.push({
          siswa_nama: rows[index].siswa_nama,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama,
          pos_nama: rows[index].pos_nama,
          month_nama: rows[index].month_nama,
          bulanan_tanggal: rows[index].bulanan_tanggal.toJSON().slice(0, 10),
          periode_mulai: rows[index].periode_mulai,
          periode_akhir: rows[index].periode_akhir,
          admin_nama: rows[index].admin_nama,
        });
      });
      res.json(data);
    });
  },

  laporanBebas: (req, res) => {
    rekap.laporanBebas(req.con, req.body, (err, rows) => {
      if (err) throw err;
      let data = [];
      Array.from(rows).forEach((element, index) => {
        data.push({
          siswa_nama: rows[index].siswa_nama,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama,
          pos_nama: rows[index].pos_nama,
          d_bebas_bayar: rows[index].d_bebas_bayar,
          d_bebas_tanggal: rows[index].d_bebas_tanggal.toJSON().slice(0, 10),
          periode_mulai: rows[index].periode_mulai,
          periode_akhir: rows[index].periode_akhir,
          admin_nama: rows[index].admin_nama,
        });
      });
      res.json(data);
    });
  },
};
