const joi = require('joi')

const schema = {
	periode: joi.object({	
		periode_mulai: joi.number().required(),
        periode_akhir: joi.number().required()
	})
}

module.exports = schema