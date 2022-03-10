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
			if (rows == 0) return res.json({error: true, message: "Id siswa tidak ditemukan."});
			res.json(rows)
		})
	},

    getByNis: (req, res) => {
		siswa.getByNis(req.con, req.params.siswa_nis, (err, rows) => {
			if(err) throw err
			if (rows == 0) return res.json({error: true, message: "Nis siswa tidak ditemukan."});
			res.json(rows)
		})
	},

    getByKelas: (req, res) => {
		siswa.getByKelas(req.con, req.params.kelas_id, (err, rows) => {
			if(err) throw err
			if (rows == 0) return res.json({error: true, message: "id kelas tidak ditemukan."});
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
		siswa.add(req.con, req.body, res, (err) => {
			if(err) throw err
            return res.json({error : false, message :'Berhasil tambah data siswa'})

		})
	},

	upload: (req, res) => {
		siswa.upload(req.con, req.files.filename, res)
	},

    update: (req, res) => {
		siswa.update(req.con, req.body, req.params.siswa_id, res)
	},

	delete: (req, res) => {
		siswa.delete(req.con, req.params.siswa_id, res, (err) => {
			if(err) return res.send(err.sqlMessage, 400)
            return res.json({error : false, message :'Berhasil hapus data siswa'})
		})
	}
}