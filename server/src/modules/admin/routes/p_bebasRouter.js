const express = require('express')
const router = express.Router()
const p_bebasController = require('../controllers/p_bebasController')
const { setTarifValidation } = require('../validator/bebas/set_tarif/set_tarif.validation')
const { bayarValidation } = require('../validator/bebas/bayar/bayar.validation')


// Router p_bebas
router.get('/bebas', p_bebasController.getAll)
router.get('/bebas_id/:bebas_id', p_bebasController.getById)
router.get('/bebas/:siswa_nis', p_bebasController.getByNis)
router.post('/set_tarif/bebas', setTarifValidation, p_bebasController.add)
router.post('/bebas/bayar/:bebas_id', bayarValidation, p_bebasController.transaction)
router.get('/invoice/bebas/:d_bebas_id', p_bebasController.invoice)
module.exports = router     