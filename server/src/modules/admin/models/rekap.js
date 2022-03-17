module.exports = {
  harianBulanan: (con, callback) => {
    let tanggal = new Date().toJSON().slice(0, 10);
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, month_nama, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id WHERE bulanan_tanggal = '${tanggal}' AND bulanan_status = '1'`,
      callback
    );
  },

  harianBebas: (con, callback) => {
    let tanggal = new Date().toJSON().slice(0, 10);
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, d_bebas_bayar, admin_nama
        FROM d_bebas INNER JOIN bebas ON d_bebas.bebas_id = bebas.bebas_id INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON d_bebas.admin_id = admin.admin_id WHERE d_bebas_tanggal = '${tanggal}'`,
      callback
    );
  },

  laporanBulanan: (con, data, callback) => {
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, month_nama, bulanan_tanggal, periode_mulai, periode_akhir, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id WHERE bulanan_tanggal BETWEEN '${data.tanggal_awal}' AND '${data.tanggal_akhir}' AND bulanan_status = '1'`,
      callback
    );
  },

  laporanBebas: (con, data, callback) => {
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, d_bebas_bayar, d_bebas_tanggal, periode_mulai, periode_akhir, admin_nama
        FROM d_bebas INNER JOIN bebas ON d_bebas.bebas_id = bebas.bebas_id INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id  INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN admin ON d_bebas.admin_id = admin.admin_id WHERE d_bebas_tanggal BETWEEN '${data.tanggal_awal}' AND '${data.tanggal_akhir}'`,
      callback
    );
  },
};
