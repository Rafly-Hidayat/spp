const { periode } = require('./periode.schema')

module.exports = {
	periodeValidation: async(req, res, next) => {
		const value = await periode.validate(req.body)
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