const express = require('express')
const router = express.Router()
const jurusanController = require('../controllers/jurusanController')
const { jurusanValidation } = require('../validator/jurusan/jurusan.validation')

// Router jurusan
router.get('/jurusan', jurusanController.getAll)
router.get('/total/jurusan', jurusanController.getTotal)
router.get('/jurusan/:jurusan_id', jurusanController.getById)
router.post('/tambah/jurusan', jurusanValidation, jurusanController.add)
router.put('/ubah/jurusan/:jurusan_id', jurusanValidation, jurusanController.update)
router.delete('/hapus/jurusan/:jurusan_id', jurusanController.delete)
module.exports = router