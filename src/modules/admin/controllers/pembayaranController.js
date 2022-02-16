const pembayaran = require('../models/pembayaran')

module.exports = {
    getAll: (req, res) => {
		pembayaran.getAll(req.con, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

    getById: (req, res) => {
		pembayaran.getById(req.con, req.params.pembayaran_id, (err, rows) => {
			if(err) throw err
			res.json(rows)
		})
	},

	add: (req, res) => {
		pembayaran.add(req.con, req.body, (err, rows) => {
			if(err) throw err
			res.send('add new pembayaran success.', 200)
		})
	},

    update: (req, res) => {
		pembayaran.update(req.con, req.body, req.params.pembayaran_id, res, (err, rows) => {
			if(err) throw err
			res.send('success.', 200)
		})
	},

	delete: (req, res) => {
		pembayaran.delete(req.con, req.params.pembayaran_id, res, (err, rows) => {
			if(err) return res.send(err.sqlMessage, 400)
			res.send('success.', 200)
		})
	}
}