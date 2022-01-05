const { kelas } = require('./kelas.schema')

module.exports = {
	kelasValidation: async(req, res, next) => {
		const value = await kelas.validate(req.body)
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