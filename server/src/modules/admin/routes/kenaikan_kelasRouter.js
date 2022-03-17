const express = require('express')
const router = express.Router()
const kenaikan_kelasController = require('../controllers/kenaikan_kelasController')
const {kenaikan_kelasValidation} = require('../validator/kenaikan_kelas/kenaikan_kelas.validation')

// Router kenaikan kelas
router.put('/kenaikan_kelas', kenaikan_kelasValidation, kenaikan_kelasController.naik_kelas)
router.delete('/kelulusan', kenaikan_kelasController.lulus)

module.exports = router