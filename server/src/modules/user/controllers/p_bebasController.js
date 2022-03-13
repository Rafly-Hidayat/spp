const p_bebas = require('../models/p_bebas')

module.exports = {
    getP_bebas: (req, res) => {
        p_bebas.getP_bebas(req.con, res, req.params.siswa_id, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    }
}