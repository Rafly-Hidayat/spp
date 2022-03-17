const { bulanan } = require('./bulanan.schema')

module.exports = {
	bulananValidation: async(req, res, next) => {
		const value = await bulanan.validate(req.body)
		if(value.error){
			res.json({
				status: 0,
				error : true,
				message: "Pilih salah satu Admin!"
			})
		}else {
			next()
		}
	}
}