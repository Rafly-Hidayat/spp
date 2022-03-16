module.exports = {
    getAll: (con, callback) => {
        con.query('SELECT bebas_tagihan, bebas_total_bayar, siswa.siswa_id, siswa_nama, pembayaran_tipe, pos_nama, periode_mulai, periode_akhir FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id INNER JOIN periode ON periode.periode_id = pembayaran.periode_id', callback)
    },

    getById: (con, bebas_id, callback) => {
        con.query(`SELECT bebas_tagihan, bebas_id, bebas_total_bayar, siswa.siswa_id, siswa_nama, pembayaran_tipe, pos_nama, periode_mulai, periode_akhir FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id INNER JOIN periode ON periode.periode_id = pembayaran.periode_id WHERE bebas.bebas_id = ${bebas_id}`, callback)
    },
    
    getByNis: (con, siswa_nis, callback) => {
        con.query(`SELECT bebas_tagihan, bebas_id, bebas_total_bayar, siswa.siswa_id, siswa_nama, pembayaran_tipe, pos_nama, periode_mulai, periode_akhir FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN pembayaran ON pembayaran.pembayaran_id = bebas.pembayaran_id INNER JOIN pos ON pos.pos_id = pembayaran.pos_id INNER JOIN periode ON periode.periode_id = pembayaran.periode_id WHERE siswa.siswa_nis = ${siswa_nis}`, callback)

    },

    add: (con, data, res) => {
        con.beginTransaction( err => {
            if(err) throw err
            con.query(`SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,(err, rows) => {
                if(err) throw err

			    if (rows == 0) return res.json({error: true, message: "Id kelas tidak ditemukan."})
                let siswa = rows.map(obj => {
                    return obj.siswa_id
                })
                const a = Array.from(siswa).values()
                const b = a.next().value

                con.query(`SELECT pembayaran_id FROM pembayaran WHERE pembayaran_id = '${data.pembayaran_id}'`,(err, rows) => {
                    if(err) throw err
                    if (rows == 0) return res.json({error: true, message: "Id pembayaran bebas tidak ditemukan."})
                    let pembayaran = rows.map(obj => {
                        return obj.pembayaran_id
                    })
                    const x = Array.from(pembayaran).values()
                    const y = x.next().value

                    con.query(`SELECT siswa_id, pembayaran_id FROM bebas WHERE siswa_id = '${b}' AND pembayaran_id = '${y}' `, (err, rows) => {
                        if(err) throw err
                            let siswa_id = rows.map(obj => {
                            return obj.siswa_id
                        })

                        let pembayaran_id = rows.map(obj => {
                            return obj.pembayaran_id
                        })

                        if (Array.from(siswa_id).length == 0 && Array.from(pembayaran_id).length == 0) {
                            const jumlah_siswa = siswa.length
                            for(let i = 0; i < jumlah_siswa; i++){
                                con.query(`INSERT INTO bebas SET siswa_id = '${siswa[i]}', pembayaran_id = '${data.pembayaran_id}', bebas_tagihan = '${data.tagihan}', bebas_total_bayar = '0' `)
                            }
                        } else {
                            con.rollback()
                            return res.json({error : true, message :'Seluruh siswa di kelas tersebut sudah di atur tagihannya untuk pembayaran ini'})
                        }
                        con.commit(err => {
                            if (err) con.rollback()
                            return res.json({error : false, message :'Set tarif berhasil'})
                        })
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

                        if (data.nominal > sisa_tagihan) {
                            con.rollback()
                            return res.json({error : true, message :'Nominal yang anda masukkan melebihi tagihan'})
                        } else {
                            con.query('SELECT admin_id FROM akses_token', (err, rows) => {
                                if(err) throw err
                                let kd_admin = rows.map((obj) => {
                                    return obj.admin_id
                                })
                                // console.log(kd_admin)
                                admin_id = kd_admin[kd_admin.length - 1]
                                // console.log(admin_id)
                                let tanggal = new Date().toJSON().slice(0, 10).replace(/-/g,'-')
                
                                con.query(`INSERT INTO d_bebas SET bebas_id = '${id_bebas}', d_bebas_bayar = '${data.nominal}', d_bebas_deskripsi = '${data.keterangan}', d_bebas_tanggal = '${tanggal}', admin_id = '${admin_id}'`, (err) => {
                                    if(err) throw err
                
                                    con.query(`SELECT d_bebas_bayar FROM d_bebas WHERE bebas_id = '${bebas_id}'`, (err, rows) => {
                                        if(err) throw err
                                        let hasil = rows.map(obj => {
                                            return obj.d_bebas_bayar
                                        })
                                        let total = hasil.reduce(function(a,b){ return a + b }, 0)
            
                                        // console.log(total)
                
                                        con.query(`UPDATE bebas SET bebas_total_bayar = '${total}' WHERE bebas_id = '${bebas_id}'`, (err) => {
                                            if(err) throw err
                
                                            con.commit(err => {
                                                if (err) con.rollback()
                                                return res.json({error : false, message :'Pembayaran berhasil'})
                                            })
                                        })
                                    })
                                })
                            })
                        }
                    })
                } else {
                    con.rollback()
        			return res.json({error: true, message: "Id pembayaran bebas tidak ditemukan."});
                }
            })
        })
    },

    invoice: (con, d_bebas_id, res) => {
        con.query(`SELECT bebas.bebas_id, bebas_tagihan, d_bebas_bayar, d_bebas_deskripsi, d_bebas_tanggal, admin_nama, siswa_nama, siswa_nis, pos_nama FROM d_bebas INNER JOIN bebas ON bebas.bebas_id = d_bebas.bebas_id INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON admin.admin_id = d_bebas.admin_id WHERE d_bebas.d_bebas_id = ${d_bebas_id}`, (err, rows) => {
            if(err) throw err
            if (rows == 0) return res.json({error: true, message: "Data pembayaran siswa tidak ditemukan."})

            return res.json({
                "bebas_id": rows[0].bebas_id,
                "bebas_tagihan": rows[0].bebas_tagihan,
                "d_bebas_bayar": rows[0].d_bebas_bayar,
                "d_bebas_deskripsi": rows[0].d_bebas_deskripsi,
                "d_bebas_tanggal": rows[0].d_bebas_tanggal.toJSON().slice(0, 10),
                "admin_nama": rows[0].admin_nama,
                "siswa_nama": rows[0].siswa_nama,
                "siswa_nis": rows[0].siswa_nis,
                "pos_nama": rows[0].pos_nama
            })

        })
    }
}