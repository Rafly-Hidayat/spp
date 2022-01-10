var Module = require('module');
var fs     = require('fs');

Module._extensions['.png'] = function(module, fn) {
  fs.readFileSync(fn).toString('base64');
  module._compile('module.exports="profile.png"', fn);
};

const img = require('../../../public/images/profile.png')

module.exports = {
    getAll: (con,callback) => {
		con.query("SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama, d_kelas_nama FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id ", callback)
	},

    getById: (con, siswa_id, callback) => {
		con.query(`SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id WHERE siswa_id = ${siswa_id}`, callback)
	},

	add: (con, data, res, callback) => {
        con.query(`SELECT siswa_nis FROM siswa WHERE siswa_nis = ${data.nis}`, (err, rows) => {
			if(err) throw err

			const gambar = img

			if(rows.length == 0) {
                 con.query(`INSERT INTO siswa SET siswa_nis = '${data.nis}', siswa_nama = '${data.nama}', siswa_password = '${data.password}', siswa_gender = '${data.gender}', siswa_img = ?, kelas_id = '${data.kelas}', jurusan_id = '${data.jurusan}', d_kelas_id = '${data.d_kelas}'`, [gambar], callback)
            } else {
                return res.json({ error: true, message: "NIS sudah terdaftar" })

            }
        })
	},

    update: (con, data, siswa_id, res, callback) => {	
		con.query(`SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('siswa_id siswa tidak ditemukan.', 404)
			con.query(`UPDATE siswa SET siswa_nis = '${data.nis}', siswa_nama = '${data.nama}', siswa_gender = '${data.gender}', kelas_id = '${data.kelas}', jurusan_id = '${data.jurusan}' WHERE siswa_id = ${siswa_id}`, callback)
		})
	},

	delete: (con, siswa_id, res, callback) => {
		con.query(`SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('siswa_id tidak ditemukan.', 404)
			con.query(`DELETE FROM siswa WHERE siswa_id = ${siswa_id}`, callback)
		})
	}
}