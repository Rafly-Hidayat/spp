const joi = require('joi')

const schema = {
	bayar: joi.object({	
		nominal: joi.number().required(),
		keterangan: joi.string().required()
	})
}

module.exports = schema