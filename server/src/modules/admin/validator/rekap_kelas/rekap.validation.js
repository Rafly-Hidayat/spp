const rekap = require('./rekap.schema')

module.exports = {
	kelas: async(req, res, next) => {
		const value = await rekap.kelas.validate(req.body)
		if(value.error){
			res.json({
				status: 0,
				message: value.error.details[0].message
			})
		} else {
			next()
		}
	},

	angkatan: async(req, res, next) => {
		const value = await rekap.angkatan.validate(req.body)
		if(value.error){
			res.json({
				status: 0,
				message: value.error.details[0].message
			})
		} else {
			next()
		}
	}
}