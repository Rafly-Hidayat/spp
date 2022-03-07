const joi = require('joi')

const schema = {
	pembayaran: joi.object({	
		pembayaran_tipe: joi.string().valid('BULAN', 'BEBAS').required(),
		periode_id: joi.number().required(),
		pos_id: joi.number().required()
	})
}

module.exports = schema