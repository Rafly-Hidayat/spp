const express = require('express')
const router = express.Router()
const p_bebasController = require('../controllers/p_bebasController')

router.get('/user/pembayaran/bebas/:siswa_id', p_bebasController.getP_bebas)
router.get('/user/detail/bebas/:siswa_id', p_bebasController.getDetail)

module.exports = router