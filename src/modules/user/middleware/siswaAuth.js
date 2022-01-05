const con = require('../../../config/db')
require('dotenv').config()

module.exports = {
    // Login Siswa
    login: (req, res) => {
        const post = {
            siswa_nis: req.body.nis,
            siswa_password: req.body.password
        }

        con.query(`SELECT * FROM siswa WHERE siswa_password = ? AND siswa_nis = ?`, [post.siswa_password, post.siswa_nis], (err, rows) => {
            if (err) res.send(err.sqlMessage, 400)

            if (rows.length == 1) {

                const siswa_id = rows[0].siswa_id
                let nama = rows.map(obj => {
                    return obj.siswa_nama
                })
                let nis = rows.map(obj => {
                    return obj.siswa_nis
                })
                let gender = rows.map(obj => {
                    return obj.siswa_gender
                })

                res.json({
                    status: true,
                    message: 'Berhasil Login sebagai ' + nama,
                    siswa_id: siswa_id,
                    nama: nama,
                    nis: nis,
                    gender: gender
                })

            } else {
                return res.json({ error: true, message: 'nis atau password salah' })
            }

        })
    }
}