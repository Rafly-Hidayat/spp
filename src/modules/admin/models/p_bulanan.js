module.exports = {
    getAll: (con, callback) => {
        con.query(`SELECT bulanan_id, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id`, callback)
    },

    getById: (con, bulanan_id, callback) => {
        con.query(`SELECT bulanan_id, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id
        WHERE bulanan_id = ${bulanan_id}`, callback)
    },

    getByNis: (con, siswa_nis, callback) => {
        con.query(`SELECT bulanan_id, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id
        WHERE siswa.siswa_nis = ${siswa_nis}`, callback)
    },

    getTotal: (con, callback) => {
        con.query(`SELECT COUNT(*) FROM bulanan`, callback)
    },

    getP_id: (con, bulanan_id, callback) => {
        con.query(`SELECT pembayaran_id FROM bulanan WHERE bulanan_id = ${bulanan_id}`, callback)
    },

    bayar: (con, bulanan_id, data,  callback) => {
        let tanggal = new Date().toJSON().slice(0, 10).replace(/-/g,'-')
        con.query(`SELECT * FROM bulanan WHERE bulanan_id = ${bulanan_id}`, (err, rows) => {
			if(err) throw err
			if(rows == 0) return res.send('bulanan_id tidak ditemukan.', 404)
			con.query(`UPDATE bulanan SET bulanan_status = '1',
                        bulanan_tanggal = '${tanggal}', admin_id = '${data.admin_id}'  WHERE bulanan_id = ${bulanan_id}`, callback)
		})
    },

    delete: (con, bulanan_id, res, callback) => {
        con.query(`SELECT * FROM bulanan WHERE bulanan_id = ${bulanan_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('bulanan_id tidak ditemukan.', 404)
            con.query(`DELETE FROM bulanan WHERE bulanan_id = ${bulanan_id}`, callback)
        })
    },

    add: (con, data, res, callback) => {
        con.beginTransaction( err => {
            if(err) throw err
            con.query(`SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,(err, rows) => {
                if(err) throw err
                if(rows == 0) return res.status(200).send('kelas tidak ditemukan.')
                let siswa = rows.map(obj => {
                    return obj.siswa_id
                })
                const a = Array.from(siswa).values()
                const b = a.next().value

                con.query(`SELECT pembayaran_id FROM pembayaran WHERE pembayaran_id = '${data.pembayaran_id}'`,(err, rows) => {
                    if(err) throw err
                    if(rows == 0) return res.status(200).send('pembayaran tidak ditemukan.')
                    let pembayaran = rows.map(obj => {
                        return obj.pembayaran_id
                    })
                    const x = Array.from(pembayaran).values()
                    const y = x.next().value

                    con.query(`SELECT siswa_id, pembayaran_id FROM bulanan WHERE siswa_id = '${b}' AND pembayaran_id = '${y}' `, (err, rows) => {
                        if(err) throw err
                            let siswa_id = rows.map(obj => {
                            return obj.siswa_id
                        })

                        let pembayaran_id = rows.map(obj => {
                            return obj.pembayaran_id
                        })

                        con.query(`SELECT * FROM month`, (err, rows) => {
                            if(err) throw err
                            let month = rows.map(obj => {
                                return obj.month_id
                            })
                                
                                if (Array.from(siswa_id).length == 0 && Array.from(pembayaran_id).length == 0) {
                                    const jumlah_siswa = siswa.length
                                    const jumlah_bulan = month.length
                                    let tanggal = new Date().toJSON().slice(0, 10).replace(/-/g,'-')
                                    for(let i = 0; i < jumlah_siswa; i++){
                                        for (let j = 0; j < jumlah_bulan; j++) {
                                            con.query(`INSERT INTO bulanan SET siswa_id = '${siswa[i]}', pembayaran_id = '${data.pembayaran_id}', bulanan_tagihan = '${data.tagihan}', month_id = '${month[j]}', bulanan_status = '0', bulanan_tanggal = '${tanggal}', admin_id = '1' `)
                                        }
                                    }
        
                                } else {
                                    con.rollback()
                                    return res.json({
                                        error : true,
                                        message :'Seluruh siswa di kelas tersebut sudah di atur tagihannya untuk pembayaran ini'})
                                }
                                con.commit(err => {
                                    if (err) con.rollback()
                                    return res.send('Set tarif berhasil', 200)
                                })
                            })
                    })
                })
            })
        })
    }
}