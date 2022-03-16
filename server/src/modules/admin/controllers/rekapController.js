const rekap = require("../models/rekap")

module.exports = {
    harianBulanan: (req, res) => {
        rekap.harianBulanan(req.con, (err, rows) => {
            if(err) throw err
            res.json(rows)
        })
    },

    harianBebas: (req, res) => {
        rekap.harianBebas(req.con, (err, rows) => {
            if(err) throw err
            res.json(rows)
        })
    },

    laporanBulanan: (req, res) => {
        rekap.laporanBulanan(req.con, req.body, (err, rows) => {
            if(err) throw err
            res.json(rows)
        })
    },

    laporanBebas: (req, res) => {
        rekap.laporanBebas(req.con, req.body, (err, rows) => {
            if(err) throw err
            res.json(rows)
        })
    },
}