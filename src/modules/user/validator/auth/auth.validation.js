const schema = require('./auth.schema')

module.exports = {
    
    login: async (req, res, next) => {
        const value = await schema.login.validate(req.body)
        if(value.error) {
            res.json({
                value: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}