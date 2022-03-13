module.exports = {
    getP_bebas: (con, siswa_id, callback) => {
        con.query(`SELECT bebas.bebas_id, bebas_tagihan, bebas_total_bayar, siswa_nama, bebas.siswa_id, siswa_nis, pembayaran_tipe, periode_mulai, periode_akhir, pos_nama, d_bebas_deskripsi, d_bebas_tanggal, admin_nama FROM bebas INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN d_bebas ON bebas.bebas_id = d_bebas.bebas_id INNER JOIN admin ON d_bebas.admin_id = admin.admin_id
            WHERE siswa.siswa_id = ${siswa_id}`, callback)
    }
}