const express = require('express')
const router = express.Router()
const p_bebasController = require('../controllers/p_bebasController')
const { setTarifValidation } = require('../validator/bebas/set_tarif/set_tarif.validation')
const { bayarValidation } = require('../validator/bebas/bayar/bayar.validation')


// Router p_bebas
router.get('/bebas', p_bebasController.getAll)
router.get('/bebas/:bebas_id', p_bebasController.getById)
router.post('/set_tarif/bebas', setTarifValidation, p_bebasController.add)
router.post('/bebas/bayar/:bebas_id', bayarValidation, p_bebasController.transaction)
module.exports = router