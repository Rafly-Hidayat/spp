const { rekap } = require('./rekap.schema')

module.exports = {
	rekapValidation: async(req, res, next) => {
		const value = await rekap.validate(req.body)
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