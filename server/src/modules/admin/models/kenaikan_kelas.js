module.exports = {
    naikKelas: (con, data, res) => {
        con.query(`SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,(err, rows) => {
            if (err) throw err
			if (rows == 0) return res.json({error: true, message: "Id kelas tidak ditemukan."})
            let siswa = rows.map(obj => {
                return obj.siswa_id
            })

            Array.from(siswa).forEach((element, index) => {
                if (data.kelas == 1){
                    con.query(`UPDATE siswa SET kelas_id = '2' WHERE siswa_id = '${siswa[index]}'`)
                } else if (data.kelas == 2){
                    con.query(`UPDATE siswa SET kelas_id = '3' WHERE siswa_id = '${siswa[index]}'`)
                }
            })

            return res.json({ error: false, message: "Siswa berhasil naik kelas" })
        })
    },

    // kelulusan masih belum bisa!
    lulus: (con, data, res) => {
        con.query(`SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,(err, rows) => {
            if (err) throw err
			if (rows == 0) return res.json({error: true, message: "Id kelas tidak ditemukan."})
            let siswa = rows.map(obj => {
                return obj.siswa_id
            })

            Array.from(siswa).forEach((element, index) => {
                con.query(`SELECT bebas_tagihan, bebas_total_bayar FROM bebas WHERE siswa_id = '${siswa[index]}'`, (err, rows) => {
                    if(err) throw err

                    let tagihan = rows.map(obj => {
                        return parseInt(obj.bebas_tagihan)
                    })
                    let bayar = rows.map(obj => {
                        return parseInt(obj.bebas_total_bayar)
                    })
              
                    con.query(`SELECT bulanan_status FROM bulanan WHERE siswa_id = '${siswa[index]}'`, (err, rows) => {
                        if(err) throw err

                        let bulanan = Array.from(rows).includes(1)

                        if(tagihan == bayar && bulanan == true) {

                        }

                    })
                })
            })
        })
    }
}