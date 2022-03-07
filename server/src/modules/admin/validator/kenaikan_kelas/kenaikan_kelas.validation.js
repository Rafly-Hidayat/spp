const { kenaikan_kelas } = require('./kenaikan_kelas.schema')

module.exports = {
	kenaikan_kelasValidation: async(req, res, next) => {
		const value = await kenaikan_kelas.validate(req.body)
		if(value.error){
			res.json({
				status: 0,
				message: value.error.details[0].message
			})
		}else {
			next()
		}
	}
}