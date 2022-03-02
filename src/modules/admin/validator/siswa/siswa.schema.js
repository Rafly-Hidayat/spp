const joi = require('joi')

const schema = {
	siswa: joi.object({	
		nis: joi.string().required(),
		nama: joi.string().required(),
        // password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
		gender: joi.string().valid('L','P').required(),
		kelas: joi.number().required(),
		jurusan: joi.number().required(),
		d_kelas: joi.number().required()
	})
}

module.exports = schema