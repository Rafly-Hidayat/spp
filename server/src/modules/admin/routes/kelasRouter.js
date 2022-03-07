const express = require('express')
const router = express.Router()
const kelasController = require('../controllers/kelasController')
const { kelasValidation } = require('../validator/kelas/kelas.validation')

// Router kelas
router.get('/kelas', kelasController.getAll)
router.get('/total/kelas', kelasController.getTotal)
router.get('/kelas/:kelas_id', kelasController.getById)
router.post('/tambah/kelas', kelasValidation, kelasController.add)
router.put('/ubah/kelas/:kelas_id', kelasValidation, kelasController.update)
router.delete('/hapus/kelas/:kelas_id', kelasController.delete)
module.exports = router