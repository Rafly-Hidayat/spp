const { jurusan } = require('./jurusan.schema')

module.exports = {
	jurusanValidation: async(req, res, next) => {
		const value = await jurusan.validate(req.body)
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