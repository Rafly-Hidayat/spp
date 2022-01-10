const joi = require('joi')

const schema = {
	d_kelas: joi.object({	
		d_kelas_nama: joi.string().required()
	})
}

module.exports = schema