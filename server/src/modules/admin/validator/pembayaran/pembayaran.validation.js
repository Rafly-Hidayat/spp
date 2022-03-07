const { pembayaran } = require('./pembayaran.schema')

module.exports = {
	pembayaranValidation: async(req, res, next) => {
		const value = await pembayaran.validate(req.body)
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