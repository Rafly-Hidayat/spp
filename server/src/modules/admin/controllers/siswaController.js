const siswa = require("../models/siswa");

module.exports = {
  getAll: (req, res) => {
    siswa.getAll(req.con, (err, rows) => {
      if (err) throw err;

      let data = [];
      rows.forEach((element, index) => {
        let gambar = rows[index].siswa_img;
        let img = "http://127.0.0.1:8000/public/images/" + gambar;
        data.push({
          siswa_id: rows[index].siswa_id,
          siswa_nis: rows[index].siswa_nis,
          siswa_nama: rows[index].siswa_nama,
          siswa_gender: rows[index].siswa_gender,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama,
          siswa_img: img,
        });
      });

      res.json(data);
    });
  },

  getById: (req, res) => {
    siswa.getById(req.con, req.params.siswa_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "Id siswa tidak ditemukan." });
      res.json(rows);
    });
  },

  getByNis: (req, res) => {
    siswa.getByNis(req.con, req.params.siswa_nis, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "Nis siswa tidak ditemukan." });
      res.json(rows);
    });
  },

  getByKelas: (req, res) => {
    siswa.getByKelas(req.con, req.params.kelas_id, (err, rows) => {
      if (err) throw err;
      if (rows == 0)
        return res.json({ error: true, message: "id kelas tidak ditemukan." });
      res.json(rows);
    });
  },

  getTotal: (req, res) => {
    siswa.getTotal(req.con, (err, rows) => {
      if (err) throw err;
      res.json({ total: rows[0]["COUNT(*)"] });
    });
  },

  add: (req, res) => {
    siswa.add(req.con, req.body, res, (err) => {
      if (err) throw err;
      return res.json({ error: false, message: "Berhasil tambah data siswa" });
    });
  },

  upload: (req, res) => {
    siswa.getJurusanId(req.con, res, req.files.filename, (jurusanId, filename) => {
      console.log(jurusanId)
      siswa.getKelasId(req.con,res,filename,(kelasId) => {
        console.log(kelasId)
        siswa.getDkelasId(req.con, res, filename, (dKelasId) => {
          console.log(dKelasId)
          siswa.upload(req.con, res, filename, kelasId, jurusanId, dKelasId)
        })
      })
    })
    // siswa.upload(req.con, req.files.filename, res, (err, rows) => {
    //   if (err) throw err;
    //   return res.json({ error: "false", message: "upload success", data: rows});
    // });
  },

  update: (req, res) => {
    siswa.update(req.con, req.body, req.params.siswa_id, res);
  },

  delete: (req, res) => {
    siswa.delete(req.con, req.params.siswa_id, res, (err) => {
      if (err) return res.send(err.sqlMessage, 400);
      return res.json({ error: false, message: "Berhasil hapus data siswa" });
    });
  },
};
