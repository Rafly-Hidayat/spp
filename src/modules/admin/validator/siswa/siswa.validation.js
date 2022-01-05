const { siswa } = require('./siswa.schema')

module.exports = {
	siswaValidation: async(req, res, next) => {
		const value = await siswa.validate(req.body)
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