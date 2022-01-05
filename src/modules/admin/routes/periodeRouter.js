const express = require('express')
const router = express.Router()
const periodeController = require('../controllers/periodeController')
const { periodeValidation } = require('../validator/periode/periode.validation')

// Router periode
router.get('/periode', periodeController.getAll)
router.get('/periode/:periode_id', periodeController.getById)
router.post('/tambah/periode', periodeValidation, periodeController.add)
router.put('/ubah/periode/:periode_id', periodeValidation, periodeController.update)
router.delete('/hapus/periode/:periode_id', periodeController.delete)
module.exports = router