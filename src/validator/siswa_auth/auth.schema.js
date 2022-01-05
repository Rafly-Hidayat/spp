const joi = require('joi')

const schema = {

    login: joi.object({
        nis: joi.string().required(),
        password: joi.string().required()
    })
}

module.exports = schema