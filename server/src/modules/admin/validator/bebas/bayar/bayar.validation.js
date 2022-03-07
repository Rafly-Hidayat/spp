const { bayar } = require('./bayar.schema')
	
module.exports = {
	bayarValidation: async(req, res, next) => {
		const value = await bayar.validate(req.body)
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