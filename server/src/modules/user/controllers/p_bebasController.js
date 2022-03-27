const p_bebas = require("../models/p_bebas");

module.exports = {
  getP_bebas: (req, res) => {
    p_bebas.getP_bebas(req.con, res, req.params.siswa_id, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getDetail: (req, res) => {
    p_bebas.getDetail(req.con, res, req.params.siswa_id, (err, rows) => {
      if (err) throw err;
      if (rows.length == 0)
        return res.json({ error: true, message: "bebas_id tidak ditemukan" });
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];

      let data = []
      rows.forEach((element, index) => {
        let d = new Date(rows[index].d_bebas_tanggal.toString());
        data.push({
          d_bebas_id: rows[index].d_bebas_id,
          no_transaksi: rows[index].no_transaksi,
          bebas_id: rows[index].bebas_id,
          d_bebas_bayar: rows[index].d_bebas_bayar,
          d_bebas_deskripsi: rows[index].d_bebas_deskripsi,
          d_bebas_tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
          admin_nama: rows[index].admin_nama,
          siswa_nama: rows[index].siswa_nama,
          siswa_kelas: rows[index].siswa_kelas,
          siswa_jurusan: rows[index].siswa_jurusan,
          siswa_nis: rows[index].siswa_nis,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama
        })
      });
      res.json(data)
    });
  },

  getInvoice: (req, res) => {
    p_bebas.getInvoice(req.con, res, req.params.siswa_id, req.params.d_bebas_id, (err, rows) => {
      if (err) throw err;
      if (rows.length == 0)
        return res.json({ error: true, message: "d_bebas_id tidak ditemukan" });
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Ags",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];

      let d = new Date(rows[0].d_bebas_tanggal.toString());
      
      return res.json([
        {
          d_bebas_id: rows[0].d_bebas_id,
          no_transaksi: rows[0].no_transaksi,
          bebas_id: rows[0].bebas_id,
          d_bebas_bayar: rows[0].d_bebas_bayar,
          d_bebas_deskripsi: rows[0].d_bebas_deskripsi,
          d_bebas_tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
          admin_nama: rows[0].admin_nama,
          siswa_nama: rows[0].siswa_nama,
          siswa_kelas: rows[0].siswa_kelas,
          siswa_jurusan: rows[0].siswa_jurusan,
          siswa_nis: rows[0].siswa_nis,
          kelas_nama: rows[0].kelas_nama,
          jurusan_nama: rows[0].jurusan_nama,
          d_kelas_nama: rows[0].d_kelas_nama
        }
      ])
    });
  },
};
