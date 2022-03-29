const schema = require('./profile.schema')

module.exports = {
    
    profile: async (req, res, next) => {
        const value = await schema.profile.validate(req.body)
        if(value.error) {
            res.json({
                error: true,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}