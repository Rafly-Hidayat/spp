const joi = require('joi')

const schema = {
	kelas: joi.object({	
		kelas_id: joi.number().required(),
        jurusan_id: joi.number().required(),
        d_kelas_id: joi.number().required()
	}),

	angkatan: joi.object({
		kelas_id: joi.number().required()
	}),
}

module.exports = schema