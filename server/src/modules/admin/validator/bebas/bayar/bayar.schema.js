const joi = require('joi')

const schema = {
	bayar: joi.object({	
		admin_id: joi.number().required(),
		nominal: joi.number().required(),
		keterangan: joi.string().required()
	})
}

module.exports = schema