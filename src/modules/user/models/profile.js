module.exports = {
    getProfile: (con, siswa_id, callback) => {
		con.query(`SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id WHERE siswa_id = ${siswa_id}`, callback)
	}
}