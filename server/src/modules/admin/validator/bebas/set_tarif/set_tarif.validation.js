const { set_tarif } = require('./set_tarif.schema')
	
module.exports = {
	setTarifValidation: async(req, res, next) => {
		const value = await set_tarif.validate(req.body)
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