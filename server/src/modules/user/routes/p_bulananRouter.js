const express = require('express')
const router = express.Router()
const p_bulananController = require('../controllers/p_bulananController')
const p_adminbulananController = require('../../admin/controllers/p_bulananController')

router.get('/user/pembayaran/bulanan/:siswa_id', p_bulananController.getP_bulanan)
router.get('/user/invoice/bulanan/:bulanan_id', p_adminbulananController.invoice)

module.exports = router