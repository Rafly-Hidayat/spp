const joi = require('joi')

const schema = {
	pos: joi.object({	
		pos_nama: joi.string().required(),
        pos_deskripsi: joi.string().required()
	})
}

module.exports = schema