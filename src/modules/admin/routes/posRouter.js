const express = require('express')
const router = express.Router()
const posController = require('../controllers/posController')
const { posValidation } = require('../validator/pos/pos.validation')

// Router Pos
router.get('/pos', posController.getAll)
router.get('/total/pos', posController.getTotal)
router.get('/pos/:pos_id', posController.getById)
router.post('/tambah/pos', posValidation, posController.add)
router.put('/ubah/pos/:pos_id', posValidation, posController.update)
router.delete('/hapus/pos/:pos_id', posController.delete)
module.exports = router