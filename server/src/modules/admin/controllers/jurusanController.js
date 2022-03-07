const jurusan = require('../models/jurusan')

module.exports = {
    getAll: (req, res) => {
		jurusan.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		jurusan.getById(req.con, req.params.jurusan_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	getTotal: (req, res) => {
		jurusan.getTotal(req.con, (err, rows) => {
			if(err) throw err
			res.json({total : rows[0]['COUNT(*)']})
		})
	},

	add: (req, res) => {
		jurusan.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new jurusan success.', 200)
		})
	},

    update: (req, res) => {
		jurusan.update(req.con, req.body, req.params.jurusan_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		jurusan.delete(req.con, req.params.jurusan_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}