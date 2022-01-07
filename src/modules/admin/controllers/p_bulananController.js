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

    add: (req, res) => {
        p_bulanan.addPembayaran(req.con, req.body, res, (err, rows) => {
            if (err) throw err
            let p_id = rows.insertId

            p_bulanan.addP_bulanan(req.con, req.body, p_id, res, (err, rows) => {
                if (err) throw err
                res.send('add new pembayaran bulanan success', 200)
            })
        })
    },

    update: (req, res) => {
        p_bulanan.updateP_bulanan(req.con, req.body, req.params.bulanan_id, res, (err, rows) => {
            if (err) throw err
            p_bulanan.getP_id(req.con, req.params.bulanan_id, (err, rows) => {
                if (err) throw err
                let p_id = rows.map(obj => {
                    return obj.pembayaran_id
                })
                console.log(p_id);
                p_bulanan.updatePembayaran(req.con, req.body, p_id, res, (err, rows) => {
                    if (err) throw err
                    res.send('Update data success', 200)
                })
            })
        })
    },

    delete: (req, res) => {
        p_bulanan.delete(req.con, req.params.bulanan_id, res, (err, rows) => {
            if (err) return res.send(err.sqlMessage, 400)
            res.send('success.', 200)
        })
    }
}