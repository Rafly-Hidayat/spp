const express = require('express')
const router = express.Router()
const p_bebasController = require('../controllers/p_bebasController')
const p_adminbebasController = require('../../admin/controllers/p_bebasController')

router.get('/user/pembayaran/bebas/:siswa_id', p_bebasController.getP_bebas)
router.get('/user/detail/bebas/:siswa_id', p_bebasController.getDetail)
router.get('/user/detail/bebas/:siswa_id/:d_bebas_id', p_bebasController.getInvoice)
router.get('/user/invoice/bebas/:d_bebas_id', p_adminbebasController.invoice)

module.exports = router