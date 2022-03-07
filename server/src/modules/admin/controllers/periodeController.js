const periode = require('../models/periode')

module.exports = {
    getAll: (req, res) => {
		periode.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		periode.getById(req.con, req.params.periode_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		periode.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new periode success.', 200)
		})
	},

    update: (req, res) => {
		periode.update(req.con, req.body, req.params.periode_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		periode.delete(req.con, req.params.periode_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}