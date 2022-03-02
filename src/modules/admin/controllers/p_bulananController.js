const p_bulanan = require('../models/p_bulanan')

module.exports = {
    getAll: (req, res) => {
        p_bulanan.getAll(req.con, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getById: (req, res) => {
        p_bulanan.getById(req.con, req.params.bulanan_id, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getByNis: (req, res) => {
        p_bulanan.getByNis(req.con, req.params.siswa_nis, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getTotal: (req, res) => {
        p_bulanan.getTotal(req.con, (err, rows) => {
            if (err) throw err
            res.json({ total: rows[0]['COUNT(*)'] })
        })
    },

    add: (req, res) => {
        p_bulanan.add(req.con, req.body, res)
    },

    bayar: (req, res) => {
        p_bulanan.bayar(req.con, req.params.bulanan_id, req.body, (err, rows) => {
            if (err) throw err
            res.send('berhasil mengubah status', 200)
        })
    },

    delete: (req, res) => {
        p_bulanan.delete(req.con, req.params.bulanan_id, res, (err, rows) => {
            if (err) return res.send(err.sqlMessage, 400)
            res.send('success.', 200)
        })
    }
}