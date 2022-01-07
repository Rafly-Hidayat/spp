const profile = require('../models/profile')

module.exports = {
    getProfile: (req,res) => {
        profile.getProfile(req.con,req.params.siswa_id, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    }
}