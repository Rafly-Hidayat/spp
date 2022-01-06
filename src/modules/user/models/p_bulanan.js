module.exports = {
    getP_bulanan: (con, siswa_id, callback) => {
        con.query(`SELECT bulanan_id, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id
        WHERE bulanan.siswa_id = ${siswa_id}`, callback)
    }
}