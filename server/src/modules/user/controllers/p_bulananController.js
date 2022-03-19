const p_bulanan = require("../models/p_bulanan");

module.exports = {
  getP_bulanan: (req, res) => {
    p_bulanan.getP_bulanan(req.con, res, req.params.siswa_id, (err, rows) => {
      if (err) throw err;

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
      let data = [];
      rows.forEach((element, index) => {
        let d = new Date(rows[index].bulanan_tanggal.toString());
        data.push({
          bulanan_id: rows[index].bulanan_id,
          no_transaksi: rows[index].no_transaksi,
          month_nama: rows[index].month_nama,
          month_id: rows[index].month_id,
          siswa_nis: rows[index].siswa_nis,
          siswa_nama: rows[index].siswa_nama,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          pembayaran_tipe: rows[index].pembayaran_tipe,
          periode_mulai: rows[index].periode_mulai,
          periode_akhir: rows[index].periode_akhir,
          pos_nama: rows[index].pos_nama,
          bulanan_tagihan: rows[index].bulanan_tagihan,
          bulanan_status: rows[index].bulanan_status,
          bulanan_tanggal: days[d.getDay()] + ", " + d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear(),
          admin_nama: rows[index].admin_nama,
        });
      });
      res.json(data);
    });
  },
};
