const express = require('express')
const router = express.Router()
const p_bulananController = require('../controllers/p_bulananController')
const { bulananValidation } = require('../validator/bulanan/bulanan.validation')

// Router Pembayaran Bulanan
router.get('/pembayaran/bulanan', p_bulananController.getAll)
router.get('/total/pembayaran/bulanan', p_bulananController.getTotal)
router.get('/pembayaran/bulanan/:bulanan_id', p_bulananController.getById)
router.post('/tambah/pembayaran/bulanan', bulananValidation, p_bulananController.add)
router.put('/ubah/pembayaran/bulanan/:bulanan_id', bulananValidation, p_bulananController.update)
router.delete('/hapus/pembayaran/bulanan/:bulanan_id', p_bulananController.delete)
module.exports = router