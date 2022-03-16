const joi = require('joi')

const schema = {
	rekap: joi.object({	
		tanggal_awal: joi.string().required(),
        tanggal_akhir: joi.string().required()
	})
}

module.exports = schema