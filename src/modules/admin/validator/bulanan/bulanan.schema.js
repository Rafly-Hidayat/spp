const { boolean } = require('joi')
const joi = require('joi')

const schema = {
	bulanan: joi.object({	
		siswa_id: joi.number().required(),
		month_id: joi.number().required(),
        bulanan_tagihan: joi.number().required(),
        bulanan_status: joi.number().required(),
        bulanan_tanggal: joi.date().iso().required(),
        admin_id: joi.number().required(),
        pembayaran_tipe: joi.string().required(),
        periode_id: joi.number().required(),
        pos_id: joi.number().required()
	})
}

module.exports = schema