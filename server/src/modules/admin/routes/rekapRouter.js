const express = require('express')
const router = express.Router()
const rekapController = require('../controllers/rekapController')
const { rekapValidation } = require('../validator/rekap/rekap.validation')
const { rekapKelasValidation } = require('../validator/rekap_kelas/rekap.validation')

// Router rekap
router.get('/laporan/harian/bulanan', rekapController.harianBulanan)
router.get('/laporan/harian/bebas', rekapController.harianBebas)

// rekap per kelas
router.post('/laporan/kelas/bebas', rekapKelasValidation, rekapController.laporanKelasBebas)
router.post('/laporan/kelas/bulanan', rekapKelasValidation, rekapController.laporanKelasBulanan)

router.post('/laporan/bulanan', rekapValidation, rekapController.laporanBulanan)
router.post('/laporan/bebas', rekapValidation, rekapController.laporanBebas)

module.exports = router