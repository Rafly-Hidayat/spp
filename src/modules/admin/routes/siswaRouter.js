const express = require('express')
const router = express.Router()
const siswaController = require('../controllers/siswaController')
const { siswaValidation } = require('../validator/siswa/siswa.validation')

// Router siswa
router.get('/siswa', siswaController.getAll)
router.get('/siswa/:siswa_id', siswaController.getById)
router.post('/tambah/siswa', siswaValidation, siswaController.add)
router.put('/ubah/siswa/:siswa_id', siswaValidation, siswaController.update)
router.delete('/hapus/siswa/:siswa_id', siswaController.delete)
module.exports = router