const { bulanan } = require('./bulanan.schema')

module.exports = {
	bulananValidation: async(req, res, next) => {
		const value = await bulanan.validate(req.body)
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