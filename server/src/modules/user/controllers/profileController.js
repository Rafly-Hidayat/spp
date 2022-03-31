const profile = require('../models/profile')

module.exports = {
    getProfile: (req, res) => {
        profile.getProfile(req.con, res, req.params.siswa_id, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getTagihanBebas: (req, res) => {
        profile.getTagihanBebas(req.con, req.params.siswa_id, res, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getTagihanBulanan: (req, res) => {
        profile.getTagihanBulanan(req.con, req.params.siswa_id, res, (err, rows) => {
            if (err) throw err
            res.json({
                total_belum_lunas: rows.length,
                data: rows
            })
        })
    },

    getTagihanLunas: (req, res) => {
        profile.getTagihanLunas(req.con, req.params.siswa_id, res, (err, rows) => {
            if (err) throw err
            res.json({
                total_lunas: rows.length,
                data: rows
            })
        })
    },

    editProfile: (req, res) => {
        profile.editProfile(req.con, res, req.files.img, req.body.password, req.params.siswa_id, (err, rows) => {
            if (err) throw err
            res.json({ error: false, message: 'Data berhasil diubah' })
        })
    }

}