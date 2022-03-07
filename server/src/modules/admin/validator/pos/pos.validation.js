const { pos } = require('./pos.schema')

module.exports = {
	posValidation: async(req, res, next) => {
		const value = await pos.validate(req.body)
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