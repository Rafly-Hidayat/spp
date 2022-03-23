const profile = require("../models/profile");

module.exports = {
  getProfile: (req, res) => {
    profile.getProfile(req.con, res, req.params.siswa_id, (err, rows) => {
      if (err) throw err;
      let data = [];
      rows.forEach((element, index) => {
        let gambar = rows[index].siswa_img;
        let img = "http://127.0.0.1:8000/public/images/" + gambar;
        data.push({
          siswa_id: rows[index].siswa_id,
          siswa_nis: rows[index].siswa_nis,
          siswa_nama: rows[index].siswa_nama,
          siswa_img: img,
          siswa_gender: rows[index].siswa_gender,
          kelas_nama: rows[index].kelas_nama,
          jurusan_nama: rows[index].jurusan_nama,
          d_kelas_nama: rows[index].d_kelas_nama,
        });
      });

      res.json(data);
    });
  },

  getTagihanBebas: (req, res) => {
    profile.getTagihanBebas(req.con, req.params.siswa_id, res, (err, rows) => {
      if (err) throw err;
      res.json(rows);
    });
  },

  getTagihanBulanan: (req, res) => {
    profile.getTagihanBulanan(
      req.con,
      req.params.siswa_id,
      res,
      (err, rows) => {
        if (err) throw err;
        res.json({
          total_belum_lunas: rows.length,
          data: rows,
        });
      }
    );
  },

  getTagihanLunas: (req, res) => {
    profile.getTagihanLunas(req.con, req.params.siswa_id, res, (err, rows) => {
      if (err) throw err;
      res.json({
        total_lunas: rows.length,
        data: rows,
      });
    });
  },

  editProfile: (req, res) => {
    profile.editProfile(
      req.con,
      res,
      req.files.img,
      req.params.siswa_id,
      (err, rows) => {
        if (err) throw err;
        // console.log(req.files.img)
        res.json({ error: false, message: "Data berhasil diubah" });
        // res.json(rows)
      }
    );
  },
};
