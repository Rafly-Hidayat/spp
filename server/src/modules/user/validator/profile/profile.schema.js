const joi = require('joi')

const schema = {

    profile: joi.object({
        password: joi.string().required()
    })
}

module.exports = schema