const kelas = require('../models/kelas')

module.exports = {
    getAll: (req, res) => {
		kelas.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		kelas.getById(req.con, req.params.kelas_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	getTotal: (req, res) => {
		kelas.getTotal(req.con, (err, rows) => {
			if(err) throw err
			res.json({total : rows[0]['COUNT(*)']})
		})
	},

	add: (req, res) => {
		kelas.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new kelas success.', 200)
		})
	},

    update: (req, res) => {
		kelas.update(req.con, req.body, req.params.kelas_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		kelas.delete(req.con, req.params.kelas_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}