const express = require('express')
const router = express.Router()
const siswaAuth = require('../middleware/siswaAuth')
const siswaValidation = require('../validator/auth/auth.validation')

router.post('/siswa/login', siswaValidation.login, siswaAuth.login)

module.exports = router