const { commit } = require("../../../config/db")

module.exports = {
    getAll : (con, callback) => {
        con.query('SELECT siswa_nama, pembayaran_tipe, bebas_tagihan, bebas_total_bayar FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id', callback)
    },

    getById : (con, bebas_id, callback) => {
        con.query(`SELECT siswa_nama, pembayaran_tipe, bebas_tagihan, bebas_total_bayar FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id WHERE bebas_id = ${bebas_id}`, callback)
    },

    add: (con, data, res) => {
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

                con.query(`SELECT siswa_id FROM bebas WHERE siswa_id = '${b}' `, (err, rows) => {
                    if(err) throw err
                    let siswa_id = rows.map(obj => {
                        return obj.siswa_id
                    })

                    if (Array.from(siswa_id).length == 0) {
                        const jumlah_siswa = siswa.length
                        for(let i = 0; i < jumlah_siswa; i++){
                            con.query(`INSERT INTO bebas SET siswa_id = '${siswa[i]}', pembayaran_id = '${data.pembayaran_id}', bebas_tagihan = '${data.tagihan}'`)
                        }
                    } else {
                        con.rollback()
                        return res.send('Seluruh siswa di kelas tersebut sudah di atur tagihannya untuk pembayaran ini', 200)
                    }
                    con.commit(err => {
                        if (err) con.rollback()
                        return res.send('Set tarif berhasil', 200)
                    })
                })
            })
        })
	},

    transaction : (con, bebas_id, data, res) => {
        con.beginTransaction( err => {
            if (err) throw err
            con.query(`SELECT bebas_id FROM bebas WHERE bebas_id = '${bebas_id}'`, (err, rows) => {
                if(err) throw err
                
                const id_bebas = rows.map(obj => {
                    return obj.bebas_id
                })
                
                if (bebas_id == id_bebas) {
                    con.query(`SELECT bebas_tagihan, bebas_total_bayar FROM bebas WHERE bebas_id = '${bebas_id}'`, (err, rows) => {
                        if(err) throw err
                        const tagihan = rows.map(obj => {
                            return obj.bebas_tagihan
                        })
                        const total_bayar = rows.map(obj => {
                            return obj.bebas_total_bayar
                        })

                        let sisa_tagihan = tagihan - total_bayar

                        if (data.jumlah_bayar > sisa_tagihan) {
                            con.rollback()
                            return res.send('jumlah pembayaran yang anda masukkan melebihi total tagihan', 400)
                        } else {
                            con.query('SELECT admin_id FROM akses_token', (err, rows) => {
                                if(err) throw err
                                let kd_admin = rows.map((obj) => {
                                    return obj.admin_id
                                })
                                console.log(kd_admin)
                                admin_id = kd_admin[kd_admin.length - 1]
                                console.log(admin_id)
                                let tanggal = new Date().toJSON().slice(0, 10).replace(/-/g,'-')
                
                                con.query(`INSERT INTO d_bebas SET bebas_id = '${id_bebas}', d_bebas_bayar = '${data.nominal}', d_bebas_deskripsi = '${data.keterangan}', d_bebas_tanggal = '${tanggal}', admin_id = '${admin_id}'`, (err) => {
                                    if(err) throw err
                
                                    con.query(`SELECT d_bebas_bayar FROM d_bebas WHERE bebas_id = '${bebas_id}'`, (err, rows) => {
                                        if(err) throw err
                                        let hasil = rows.map(obj => {
                                            return obj.d_bebas_bayar
                                        })
                                        let total = hasil.reduce(function(a,b){ return a + b }, 0)
            
                                        console.log(total)
                
                                        con.query(`UPDATE bebas SET bebas_total_bayar = '${total}' WHERE bebas_id = '${bebas_id}'`, (err) => {
                                            if(err) throw err
                
                                            con.commit(err => {
                                                if (err) con.rollback()
                                                return res.send('Berhasil melakukan pembayaran', 200)
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    })
                } else {
                    con.rollback()
                    return res.send('bebas_id tidak ditemukan.', 404)
                }
            })
        })
    },
}