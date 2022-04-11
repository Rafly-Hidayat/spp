const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/adminAuth')
const adminValidation = require('../validator/auth/auth.validation')

// Router Autentikasi Admin
router.get('/admin', adminAuth.getAll)
router.post('/admin/login', adminValidation.login, adminAuth.login)

module.exports = router