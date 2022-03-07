const joi = require('joi')

const schema = {
	jurusan: joi.object({	
		jurusan_nama: joi.string().uppercase().required()
	})
}

module.exports = schema