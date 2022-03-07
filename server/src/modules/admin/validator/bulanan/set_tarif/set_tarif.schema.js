const joi = require('joi')

const schema = {
	set_tarif: joi.object({	
		kelas: joi.number().required(),
		pembayaran_id: joi.number().required(),
		tagihan: joi.number().required()
	})
}

module.exports = schema