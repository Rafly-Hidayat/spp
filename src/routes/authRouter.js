const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const verifikasi = require('../middleware/verifikasi')
const validation = require('../validator/auth/auth.validation')

router.post('/login', validation.login, auth.login)

router.post('/registrasi', validation.register, auth.register)

router.get('/inventori', verifikasi.verifikasiAdmin(),auth.inventori)

module.exports = router