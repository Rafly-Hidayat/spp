const joi = require('joi')

const schema = {
	kelas: joi.object({	
		kelas_nama: joi.string().required()
	})
}

module.exports = schema