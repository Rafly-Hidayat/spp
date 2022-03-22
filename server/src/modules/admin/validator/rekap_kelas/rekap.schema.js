const joi = require('joi')

const schema = {
	rekap: joi.object({	
		kelas_id: joi.number().required(),
        jurusan_id: joi.number().required(),
        d_kelas_id: joi.number().required()
	})
}

module.exports = schema