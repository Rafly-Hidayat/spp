module.exports = {
    getProfile: (con, siswa_id, callback) => {
		con.query(`SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id WHERE siswa_id = ${siswa_id}`, callback)
	},

	getTagihanBebas: (con, siswa_id, res,callback) => {
		con.query(`SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`, (err, rows) => {
			if (err) throw err
			if(rows == 0) return res.status(404).send('siswa tidak ditemukan.')

			con.query(`SELECT SUM(bebas_tagihan - bebas_total_bayar) over (partition by bebas.pembayaran_id) as sisa_tagihan, pembayaran_tipe, pos_nama, pos_deskripsi FROM bebas INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id WHERE siswa_id = ${siswa_id}`, callback)
		})
	},

	getTagihanBulanan: (con, siswa_id, res,callback) => {
		con.query(`SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`, (err, rows) => {
			if (err) throw err
			if(rows == 0) return res.status(404).send('siswa tidak ditemukan.')

			con.query(`SELECT bulanan_tagihan, month_nama, pembayaran_tipe, pos_nama, pos_deskripsi FROM bulanan INNER JOIN month ON month.month_id = bulanan.month_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bulanan.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id WHERE siswa_id = ${siswa_id} AND bulanan_status = 0 ORDER BY bulanan.month_id`, callback)
		})
	},

	getTagihanLunas: (con, siswa_id, res,callback) => {
		con.query(`SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`, (err, rows) => {
			if (err) throw err
			if(rows == 0) return res.status(404).send('siswa tidak ditemukan.')

			con.query(`SELECT bulanan_tagihan, month_nama, pembayaran_tipe, pos_nama, pos_deskripsi FROM bulanan INNER JOIN month ON month.month_id = bulanan.month_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bulanan.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id WHERE siswa_id = ${siswa_id} AND bulanan_status = 1 ORDER BY bulanan.month_id`, callback)
		})
	}
}
