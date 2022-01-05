const pos = require('../models/pos')

module.exports = {
    getAll: (req, res) => {
		pos.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		pos.getById(req.con, req.params.pos_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		pos.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new pos success.', 200)
		})
	},

    update: (req, res) => {
		pos.update(req.con, req.body, req.params.pos_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		pos.delete(req.con, req.params.pos_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}