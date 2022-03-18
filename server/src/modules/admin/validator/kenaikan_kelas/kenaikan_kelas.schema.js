const joi = require('joi')

const schema = {
	kenaikan_kelas: joi.object({
		kelas: joi.number().valid(1,2).required(),
		ke_kelas: joi.number().valid(2,3).required()
	})
}

module.exports = schema