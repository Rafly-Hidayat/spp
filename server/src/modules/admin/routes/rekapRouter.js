const express = require('express')
const router = express.Router()
const rekapController = require('../controllers/rekapController')
const { rekapValidation } = require('../validator/rekap/rekap.validation')

// Router rekap
router.get('/laporan/harian/bulanan', rekapController.harianBulanan)
router.get('/laporan/harian/bebas', rekapController.harianBebas)
router.post('/laporan/bulanan', rekapValidation, rekapController.laporanBulanan)
router.post('/laporan/bebas', rekapValidation, rekapController.laporanBebas)

module.exports = router