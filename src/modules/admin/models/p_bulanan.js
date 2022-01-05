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

    getP_id: (con, bulanan_id, callback) => {
        con.query(`SELECT pembayaran_id FROM bulanan WHERE bulanan_id = ${bulanan_id}`, callback)
    },

    addPembayaran: (con, data, res, callback) => {

        con.query(`INSERT INTO pembayaran SET 
                  pembayaran_tipe = '${data.pembayaran_tipe}',
                  periode_id = ${data.periode_id},
                  pos_id = ${data.pos_id} `, callback)
    },

    addP_bulanan: (con, data, p_id, res, callback) => {

        con.query(`INSERT INTO bulanan SET 
                  pembayaran_id = ${p_id},
                  siswa_id = ${data.siswa_id},
                  month_id = ${data.month_id},
                  bulanan_tagihan = ${data.bulanan_tagihan},
                  bulanan_status = ${data.bulanan_status},
                  bulanan_tanggal = ${data.bulanan_tanggal},
                  admin_id = ${data.admin_id} `, callback)
    },

    updateP_bulanan: (con, data, bulanan_id, res, callback) => {
        con.query(`SELECT * FROM bulanan WHERE bulanan_id = ${bulanan_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('bulanan_id tidak ditemukan.', 404)
            con.query(`UPDATE bulanan SET 
            siswa_id = ${data.siswa_id},
            month_id = ${data.month_id},
            bulanan_tagihan = ${data.bulanan_tagihan},
            bulanan_status = ${data.bulanan_status},
            bulanan_tanggal = ${data.bulanan_tanggal},
            admin_id = ${data.admin_id}
            WHERE bulanan_id = ${bulanan_id}`, callback)
        })
    },

    updatePembayaran: (con, data, p_id, res, callback) => {
        con.query(`SELECT * FROM bulanan WHERE pembayaran_id = ${p_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('p_id tidak ditemukan.', 404)
            con.query(`UPDATE pembayaran SET 
            pembayaran_tipe = '${data.pembayaran_tipe}',
            periode_id = ${data.periode_id},
            pos_id = ${data.pos_id}
            WHERE pembayaran_id = ${p_id}`, callback)
        })
    },

    delete: (con, bulanan_id, res, callback) => {
        con.query(`SELECT * FROM bulanan WHERE bulanan_id = ${bulanan_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('bulanan_id tidak ditemukan.', 404)
            con.query(`DELETE FROM bulanan WHERE bulanan_id = ${bulanan_id}`, callback)
        })
    }
}