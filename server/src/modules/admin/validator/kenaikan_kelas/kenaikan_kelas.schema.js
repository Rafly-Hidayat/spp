const joi = require('joi')

const schema = {
	kenaikan_kelas: joi.object({
		kelas: joi.number().valid(1,2).required()
	})
}

module.exports = schema