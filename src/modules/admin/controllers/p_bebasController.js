const bebas = require('../models/p_bebas')

module.exports = {
    getAll: (req, res) => {
		bebas.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		bebas.getById(req.con, req.params.bebas_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		bebas.add(req.con, req.body, res)
	},

	transaction: (req, res) => {
		bebas.transaction(req.con, req.params.bebas_id, req.body, res)
	}
}