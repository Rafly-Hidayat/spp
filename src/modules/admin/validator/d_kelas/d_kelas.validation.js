const { d_kelas } = require('./d_kelas.schema')

module.exports = {
	d_kelasValidation: async(req, res, next) => {
		const value = await d_kelas.validate(req.body)
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