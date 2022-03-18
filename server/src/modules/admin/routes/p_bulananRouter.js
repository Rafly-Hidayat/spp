const express = require('express')
const router = express.Router()
const p_bulananController = require('../controllers/p_bulananController')
const { setTarifValidation } = require('../validator/bulanan/set_tarif/set_tarif.validation')
const { bulananValidation } = require('../validator/bulanan/bayar/bulanan.validation')

// Router Pembayaran Bulanan
router.get('/bulanan', p_bulananController.getAll)
router.get('/total/pembayaran/bulanan', p_bulananController.getTotal)
router.get('/bulanan_id/:bulanan_id', p_bulananController.getById)
router.get('/bulanan/:siswa_nis', p_bulananController.getByNis)
router.put('/bulanan/bayar/:bulanan_id', bulananValidation, p_bulananController.bayar)
router.post('/set_tarif/bulanan', setTarifValidation, p_bulananController.add)
router.get('/invoice/bulanan/:bulanan_id', p_bulananController.invoice)
module.exports = router