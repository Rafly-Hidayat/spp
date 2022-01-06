const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.get('/profile/:siswa_id', profileController.getProfile)

module.exports = router