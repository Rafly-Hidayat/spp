const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const { profile } = require('../validator/profile/profile.validation')

router.get('/profile/:siswa_id', profileController.getProfile)
router.get('/tagihan/bebas/:siswa_id', profileController.getTagihanBebas)
router.get('/tagihan/bulanan/:siswa_id', profileController.getTagihanBulanan)
router.get('/tagihan/lunas/:siswa_id', profileController.getTagihanLunas)
router.put('/profile/edit/:siswa_id', profile, profileController.editProfile)
module.exports = router