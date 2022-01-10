const express = require('express')
const router = express.Router()
const d_kelasController = require('../controllers/d_kelasController')
const { d_kelasValidation } = require('../validator/d_kelas/d_kelas.validation')

// Router d_kelas
router.get('/d_kelas', d_kelasController.getAll)
router.get('/d_kelas/:d_kelas_id', d_kelasController.getById)
router.post('/tambah/d_kelas', d_kelasValidation, d_kelasController.add)
router.put('/ubah/d_kelas/:d_kelas_id', d_kelasValidation, d_kelasController.update)
router.delete('/hapus/d_kelas/:d_kelas_id', d_kelasController.delete)
module.exports = router