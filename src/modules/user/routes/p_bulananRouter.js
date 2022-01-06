const express = require('express')
const router = express.Router()
const p_bulananController = require('../controllers/p_bulananController')

router.get('/user/pembayaran/bulanan/:siswa_id', p_bulananController.getP_bulanan)

module.exports = router