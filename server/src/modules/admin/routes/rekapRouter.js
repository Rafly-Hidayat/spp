const express = require('express')
const router = express.Router()
const rekapController = require('../controllers/rekapController')
const { rekapValidation } = require('../validator/rekap/rekap.validation')
const rekapKelasValidation = require('../validator/rekap_kelas/rekap.validation')

// Router rekap harian
router.get('/laporan/harian/bulanan', rekapController.harianBulanan)
router.get('/laporan/harian/bebas', rekapController.harianBebas)

// Router laporan pembyaran 
router.post('/laporan/bulanan', rekapValidation, rekapController.laporanBulanan)
router.post('/laporan/bebas', rekapValidation, rekapController.laporanBebas)

// rekap per kelas
router.post('/laporan/kelas/bebas', rekapKelasValidation.kelas, rekapController.laporanKelasBebas)
router.post('/laporan/kelas/bulanan', rekapKelasValidation.kelas, rekapController.laporanKelasBulanan)

// rekap per angkatan
router.post('/laporan/angkatan/bebas', rekapKelasValidation.angkatan, rekapController.laporanAngkatanBebas)
router.post('/laporan/angkatan/bulanan', rekapKelasValidation.angkatan, rekapController.laporanAngkatanBulanan)


module.exports = router