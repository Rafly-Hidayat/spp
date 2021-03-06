const p_bulanan = require("../models/p_bulanan");

module.exports = {
  getAll: (req, res) => {
    p_bulanan.getAll(req.con, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getById: (req, res) => {
    p_bulanan.getById(req.con, req.params.bulanan_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "Id siswa tidak ditemukan." });
      res.json(rows);
    });
  },

  getByNis: (req, res) => {
    p_bulanan.getByNis(req.con, req.params.siswa_nis, req.params.periode_mulai, req.params.periode_akhir, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "Nis siswa tidak ditemukan." });
      res.json(rows);
    });
  },

  getTotal: (req, res) => {
    p_bulanan.getTotal(req.con, (err, rows) => {
      if (err) throw err;
      res.json({ total: rows[0]["COUNT(*)"] });
    });
  },

  add: (req, res) => {
    p_bulanan.add(req.con, req.body, res);
  },
  
  upload: (req, res) => {
    p_bulanan.getIdSiswa(req.con, res, req.files.filename, (siswaId, filename) => {
      
      p_bulanan.getNamaSiswa(req.con, res, siswaId, filename, () => {
        
        p_bulanan.getPembayaranId(req.con, res, filename, (pembayaranId) => {
          
          p_bulanan.getMonth(req.con, res, filename, (monthId)=> {
            
            p_bulanan.getAdminId(req.con, res, filename, (adminId) => {
              
              p_bulanan.upload(req.con, res, filename, siswaId, pembayaranId, monthId, adminId)
            })
          })

        })
      })
    })
  },

  bayar: (req, res) => {
    p_bulanan.bayar(req.con, res, req.params.bulanan_id, req.body, (err) => {
      if (err) throw err;
      return res.json({ error: false, message: "Pembayaran berhasil" });
    });
  },

  invoice: (req, res) => {
    p_bulanan.invoice(req.con, req.params.bulanan_id, res);
  },
};
