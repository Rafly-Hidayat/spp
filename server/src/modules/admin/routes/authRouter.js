const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/adminAuth')
const verifikasi = require('../middleware/verifikasi')
const adminValidation = require('../validator/auth/auth.validation')

// Router Autentikasi Admin
router.get('/admin', adminAuth.getAll)
router.post('/admin/login', adminValidation.login, adminAuth.login)
router.post('/admin/registrasi', adminValidation.register, adminAuth.register)

// router untuk tes verfikasi token
router.get('/inventori', verifikasi.verifikasiAdmin(), adminAuth.inventori)

module.exports = router