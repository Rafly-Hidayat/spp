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
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
      const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"]
      let data = [];
      Array.from(rows).forEach((element, index) => {
        let d = new Date(rows[index].bulanan_tanggal.toString())
        data.push({
          siswa_nama: rows[index].siswa_nama,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama,
          pos_nama: rows[index].pos_nama,
          month_nama: rows[index].month_nama,
          periode_mulai: rows[index].periode_mulai,
          periode_akhir: rows[index].periode_akhir,
          admin_nama: rows[index].admin_nama,
          tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
        });
      });
      res.json(data);
    });
  },

  laporanBebas: (req, res) => {
    rekap.laporanBebas(req.con, req.body, (err, rows) => {
      if (err) throw err;
      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
      const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"]
      let data = [];
      Array.from(rows).forEach((element, index) => {
        let d = new Date(rows[index].d_bebas_tanggal.toString())
        data.push({
          siswa_nama: rows[index].siswa_nama,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama,
          pos_nama: rows[index].pos_nama,
          d_bebas_deskripsi: rows[index].d_bebas_deskripsi,
          d_bebas_bayar: rows[index].d_bebas_bayar,
          periode_mulai: rows[index].periode_mulai,
          periode_akhir: rows[index].periode_akhir,
          admin_nama: rows[index].admin_nama,
          tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
        });
      });
      res.json(data);
    });
  },

  laporanKelasBebas: (req, res) => {
    rekap.laporanKelasBebas(req.con, res, req.body)
  },
  
  laporanKelasBulanan: (req, res) => {
    rekap.laporanKelasBulanan(req.con, res, req.body)
  },

  laporanAngkatanBebas: (req, res) => {
    rekap.laporanAngkatanBebas(req.con, res, req.body)
  },

  laporanAngkatanBulanan: (req, res) => {
    rekap.laporanAngkatanBulanan(req.con, res, req.body)
  }

};
