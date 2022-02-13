const siswa = require('../models/siswa')

module.exports = {
    getAll: (req, res) => {
		siswa.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		siswa.getById(req.con, req.params.siswa_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	getTotal: (req, res) => {
		siswa.getTotal(req.con, (err, rows) => {
			if(err) throw err
			res.json({total : rows[0]['COUNT(*)']})
		})
	},

    add: (req, res) => {
		siswa.add(req.con, req.body, res, (err, rows) => {
			if(err) throw err
			res.send('add new siswa success.', 200)
		})
	},

    update: (req, res) => {
		siswa.update(req.con, req.body, req.params.siswa_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		siswa.delete(req.con, req.params.siswa_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}