module.exports = {
    naikKelas: (con, data, res) => {
        con.query(`SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,(err, rows) => {
            if (err) throw err
			if (rows == 0) return res.json({error: true, message: "Id kelas tidak ditemukan."})
            let siswa = rows.map(obj => {
                return obj.siswa_id
            })

            for (let i = 0; i < Array.from(siswa).length; i++) {
                con.query(`UPDATE siswa SET kelas_id = '${data.ke_kelas}' WHERE siswa_id = '${siswa[i]}'`, (err) => {
                    if (err) throw err
                })
            }
            return res.json({ error: false, message: "Siswa berhasil naik kelas" })
        })
    }
}