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

                let img = rows.map(obj => {
                    return obj.siswa_img
                })

                con.query(`SELECT kelas_nama FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id WHERE siswa.siswa_id = ${siswa_id}`, (err, rows) => {
                    if (err) res.send(err.sqlMessage, 400)
                    let kelas = rows.map(obj => {
                        return obj.kelas_nama
                    })

                    con.query(`SELECT jurusan_nama FROM siswa INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id WHERE siswa.siswa_id = ${siswa_id}`, (err, rows) => {
                        if (err) res.send(err.sqlMessage, 400)
                        let jurusan = rows.map(obj => {
                            return obj.jurusan_nama
                        })
                        con.query(`SELECT d_kelas_nama FROM siswa INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id WHERE siswa.siswa_id = ${siswa_id}`, (err, rows) => {
                            if (err) res.send(err.sqlMessage, 400)
                            let d_kelas = rows.map(obj => {
                                return obj.d_kelas_nama
                            })

                            res.json({
                                status: true,
                                message: 'Berhasil Login sebagai ' + nama,
                                siswa_id: siswa_id,
                                nama: nama,
                                nis: nis,
                                kelas: kelas + ' ' + jurusan+ ' ' + d_kelas,
                                gender: gender,
                                img: img
                            })
                        })
                    })
                })

            } else {
                return res.json({ error: true, message: 'nis atau password salah' })
            }
        })
    }
}