const joi = require('joi').extend(require('@joi/date'))

const schema = {
	bulanan: joi.object({	
        admin_id: joi.number().required()
	})
}

module.exports = schema