const profile = require('../models/profile')

// function formatter(data) {
//     let	number_string = data.toString(),
//     sisa 	= number_string.length % 3,
//     rupiah 	= number_string.substr(0, sisa),
//     ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
        
//     if (ribuan) {
//         separator = sisa ? '.' : '';
//         rupiah += separator + ribuan.join('.');
//     }
//     return rupiah;
// }

module.exports = {
    getProfile: (req,res) => {
        profile.getProfile(req.con,req.params.siswa_id, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getTagihanBebas: (req,res) => {
        profile.getTagihanBebas(req.con,req.params.siswa_id, res, (err, rows) => {
            if (err) throw err
            res.json(rows)
        })
    },

    getTagihanBulanan: (req,res) => {
        profile.getTagihanBulanan(req.con,req.params.siswa_id, res, (err, rows) => {
            if (err) throw err
            res.json({
                total_belum_lunas: rows.length,
                data: rows
            })
        })
    },

    getTagihanLunas: (req,res) => {
        profile.getTagihanLunas(req.con,req.params.siswa_id, res, (err, rows) => {
            if (err) throw err
            res.json({
                total_lunas: rows.length,
                data: rows
            })
        })
    }
        
}