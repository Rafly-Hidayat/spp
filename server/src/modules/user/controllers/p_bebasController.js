const p_bebas = require('../models/p_bebas')

module.exports = {
    getP_bebas: (req, res) => {
        p_bebas.getP_bebas(req.con, req.params.siswa_id, (err, rows) => {
            if (err) throw err
            if(rows.length == 0) {
                res.json({
                    error: true,
                    message: 'Data tidak ditemukan'
                })
            } else {
                res.json(rows)
            }
        })
    }
}