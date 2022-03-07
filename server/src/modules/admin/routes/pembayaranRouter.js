const express = require('express')
const router = express.Router()
const pembayaranController = require('../controllers/pembayaranController')
const { pembayaranValidation } = require('../validator/pembayaran/pembayaran.validation')

// Router pembayaran
router.get('/pembayaran', pembayaranController.getAll)
router.get('/pembayaran/:pembayaran_id', pembayaranController.getById)
router.post('/tambah/pembayaran', pembayaranValidation, pembayaranController.add)
router.put('/ubah/pembayaran/:pembayaran_id', pembayaranValidation, pembayaranController.update)
router.delete('/hapus/pembayaran/:pembayaran_id', pembayaranController.delete)
module.exports = router