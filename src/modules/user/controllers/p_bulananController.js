const p_bulanan = require('../models/p_bulanan')

module.exports = {
    getP_bulanan: (req, res) => {
        p_bulanan.getP_bulanan(req.con, req.params.siswa_id, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    }
}