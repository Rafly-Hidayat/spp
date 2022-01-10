const d_kelas = require('../models/d_kelas')

module.exports = {
    getAll: (req, res) => {
		d_kelas.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		d_kelas.getById(req.con, req.params.d_kelas_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		d_kelas.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new d_kelas success.', 200)
		})
	},

    update: (req, res) => {
		d_kelas.update(req.con, req.body, req.params.d_kelas_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		d_kelas.delete(req.con, req.params.d_kelas_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}