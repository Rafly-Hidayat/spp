var Module = require("module");
var fs = require("fs");
let importExcel = require("convert-excel-to-json");

Module._extensions[".png"] = function (module, fn) {
  fs.readFileSync(fn).toString("base64");
  module._compile('module.exports="profile.png"', fn);
};

const img = require("../../../public/images/profile.png");

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  getAll: (con, callback) => {
    con.query(
      "SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama, d_kelas_nama, siswa_img FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id ",
      callback
    );
  },

  getById: (con, siswa_id, callback) => {
    con.query(
      `SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama, d_kelas_nama, siswa_img FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id  INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id WHERE siswa_id = ${siswa_id}`,
      callback
    );
  },

  getByNis: (con, siswa_nis, callback) => {
    con.query(
      `SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, kelas_nama, jurusan_nama, d_kelas_nama, siswa_img FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id WHERE siswa_nis = ${siswa_nis}`,
      callback
    );
  },

  getByKelas: (con, kelas_id, callback) => {
    con.query(
      `SELECT siswa_id, siswa_nis, siswa_nama, siswa_gender, siswa.kelas_id, kelas_nama, jurusan_nama, d_kelas_nama, siswa_img FROM siswa INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id WHERE siswa.kelas_id = ${kelas_id}`,
      callback
    );
  },

  getTotal: (con, callback) => {
    con.query("SELECT COUNT(*) FROM siswa", callback);
  },

  add: (con, data, res, callback) => {
    con.query(
      `SELECT siswa_nis FROM siswa WHERE siswa_nis = ${data.nis}`,
      (err, rows) => {
        if (err) throw err;

        const gambar = img;
        let password = makeid(8);

        if (rows.length == 0) {
          con.query(
            `INSERT INTO siswa SET siswa_nis = '${data.nis}', siswa_nama = '${data.nama}', siswa_password = '${password}', siswa_gender = '${data.gender}', siswa_img = ?, kelas_id = '${data.kelas}', jurusan_id = '${data.jurusan}', d_kelas_id = '${data.d_kelas}'`,
            [gambar],
            callback
          );
        } else {
          return res.json({ error: true, message: "NIS sudah terdaftar" });
        }
      }
    );
  },

  getJurusanId: (con, res, data, callback) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      let file = data;
      let filename = file.name;

      file.mv("./public/" + filename, (err) => {
        if (err) {
          res.json({ error: true, message: "gagal upload" });
        } else {
          let result = importExcel({
            sourceFile: "./public/" + filename,
            header: { rows: 1 },
            columnToKey: {
              A: "siswa_nis",
              B: "siswa_nama",
              C: "siswa_gender",
              D: "kelas",
              E: "nama_jurusan",
              F: "d_kelas",
            },
            sheets: ["Sheet1"],
          });
          let data = [];
          let response = [];
          result.Sheet1.forEach((element, index) => {
            data.push({
              // siswa_nis: result.Sheet1[index].siswa_nis,
              // siswa_nama: result.Sheet1[index].siswa_nama,
              // siswa_gender: result.Sheet1[index].siswa_gender,
              // kelas: result.Sheet1[index].kelas,
              nama_jurusan: result.Sheet1[index].nama_jurusan,
              // d_kelas: result.Sheet1[index].d_kelas
            });
            response.push(data[index].nama_jurusan);
          });

          con.query(`SELECT jurusan_nama FROM jurusan`, (err, rows) => {
            if (err) throw err;
            let namaJurusan = rows.map((obj) => {
              return obj.jurusan_nama;
            });

            const containsAll = response.every((element) => {
              return namaJurusan.includes(element);
            });

            let data2 = [];
            if (containsAll) {
              response.forEach((element, index) => {
                con.query(
                  `SELECT jurusan_id FROM jurusan WHERE jurusan_nama = '${response[index]}'`,
                  (err, rows) => {
                    if (err) throw err;
                    data2.push(rows[0].jurusan_id);
                  }
                );
              });
            } else {
              con.rollback();
              return res.json({
                error: true,
                message: "nama jurusan tidak tersedia.",
              });
            }

            // console.log(data2)
            con.commit((err) => {
              if (err) throw err;
              return callback(data2, filename);
            });
          });
        }
      });
    });
  },

  getKelasId: (con, res, filename, callback) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      let result = importExcel({
        sourceFile: "./public/" + filename,
        header: { rows: 1 },
        columnToKey: {
          A: "siswa_nis",
          B: "siswa_nama",
          C: "siswa_gender",
          D: "kelas",
          E: "nama_jurusan",
          F: "d_kelas",
        },
        sheets: ["Sheet1"],
      });

      let data = [];
      let response = [];
      result.Sheet1.forEach((element, index) => {
        data.push({
          // siswa_nis: result.Sheet1[index].siswa_nis,
          // siswa_nama: result.Sheet1[index].siswa_nama,
          // siswa_gender: result.Sheet1[index].siswa_gender,
          kelas: result.Sheet1[index].kelas,
          // nama_jurusan: result.Sheet1[index].nama_jurusan,
          // d_kelas: result.Sheet1[index].d_kelas
        });
        response.push(data[index].kelas);
      });

      con.query(`SELECT kelas_nama FROM kelas`, (err, rows) => {
        if (err) throw err;
        let namaKelas = rows.map((obj) => {
          return obj.kelas_nama;
        });

        const containsAll = response.every((element) => {
          return namaKelas.includes(element);
        });

        let data2 = [];
        if (containsAll) {
          response.forEach((element, index) => {
            con.query(
              `SELECT kelas_id FROM kelas WHERE kelas_nama = '${response[index]}'`,
              (err, rows) => {
                if (err) throw err;
                data2.push(rows[0].kelas_id);
              }
            );
          });
        } else {
          con.rollback();
          return res.json({
            error: true,
            message: "nama kelas tidak tersedia.",
          });
        }

        // console.log(data2)
        con.commit((err) => {
          if (err) throw err;
          return callback(data2);
        });
      });
    });
  },

  getDkelasId: (con, res, filename, callback) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      let result = importExcel({
        sourceFile: "./public/" + filename,
        header: { rows: 1 },
        columnToKey: {
          A: "siswa_nis",
          B: "siswa_nama",
          C: "siswa_gender",
          D: "kelas",
          E: "nama_jurusan",
          F: "d_kelas",
        },
        sheets: ["Sheet1"],
      });

      let data = [];
      let response = [];
      result.Sheet1.forEach((element, index) => {
        data.push({
          // siswa_nis: result.Sheet1[index].siswa_nis,
          // siswa_nama: result.Sheet1[index].siswa_nama,
          // siswa_gender: result.Sheet1[index].siswa_gender,
          // kelas: result.Sheet1[index].kelas,
          // nama_jurusan: result.Sheet1[index].nama_jurusan,
          d_kelas: result.Sheet1[index].d_kelas,
        });
        response.push(data[index].d_kelas);
      });

      con.query(`SELECT d_kelas_nama FROM d_kelas`, (err, rows) => {
        if (err) throw err;
        let namaDkelas = rows.map((obj) => {
          return obj.d_kelas_nama;
        });

        const containsAll = response.every((element) => {
          return namaDkelas.includes(element);
        });

        let data2 = [];
        if (containsAll) {
          response.forEach((element, index) => {
            con.query(
              `SELECT d_kelas_id FROM d_kelas WHERE d_kelas_nama = '${response[index]}'`,
              (err, rows) => {
                if (err) throw err;
                data2.push(rows[0].d_kelas_id);
              }
            );
          });
        } else {
          con.rollback();
          return res.json({
            error: true,
            message: "nama d_kelas tidak tersedia.",
          });
        }

        con.commit((err) => {
          if (err) throw err;
          return callback(data2);
        });
      });
    });
  },

  upload: (con, res, filename, kelasId, jurusanId, dKelasID) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      let result = importExcel({
        sourceFile: "./public/" + filename,
        header: { rows: 1 },
        columnToKey: {
          A: "siswa_nis",
          B: "siswa_nama",
          C: "siswa_gender",
          D: "kelas_id",
          E: "nama_jurusan",
          F: "d_kelas_id",
        },
        sheets: ["Sheet1"],
      });

      con.query(`SELECT siswa_nis FROM siswa`, (err, rows) => {
        if (err) console.log(err);
        let siswa = rows.map((obj) => {
          return obj.siswa_nis;
        });

        for (let i = 0; result.Sheet1.length > i; i++) {
          let password = makeid(8);
          if (
            Array.from(siswa).includes(result.Sheet1[i].siswa_nis.toString()) ==
            false
          ) {
            con.query(
              `INSERT INTO siswa SET siswa_nis = '${result.Sheet1[i].siswa_nis}', siswa_nama = '${result.Sheet1[i].siswa_nama}', siswa_password = '${password}', siswa_gender = '${result.Sheet1[i].siswa_gender}', siswa_img = 'profile.png', kelas_id = '${kelasId[i]}', jurusan_id = '${jurusanId[i]}', d_kelas_id = '${dKelasID[i]}'`
            );
          } else {
            con.rollback();
            return res.json({
              error: true,
              message: "NIS sudah terdaftar",
            });
          }
        }

        con.commit((err) => {
          if (err) con.rollback();
          return res.json({
            error: false,
            message: "Berhasil tambah data siswa",
          });
        });
      });
    });
  },

  update: (con, data, siswa_id, res) => {
    con.query(
      `SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id siswa siswa tidak ditemukan.",
          });

        con.query(
          `UPDATE siswa SET siswa_nis = '${data.nis}', siswa_nama = '${data.nama}', siswa_gender = '${data.gender}', kelas_id = '${data.kelas}', jurusan_id = '${data.jurusan}', d_kelas_id = '${data.d_kelas}' WHERE siswa_id = '${siswa_id}'`,
          (err) => {
            if (err)
              return res.json({ error: true, message: "NIS sudah terdaftar" });

            return res.json({
              error: false,
              message: "Berhasil ubah data siswa",
            });
          }
        );
      }
    );
  },

  delete: (con, siswa_id, res, callback) => {
    con.query(
      `SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id siswa tidak ditemukan.",
          });
        con.query(`DELETE FROM siswa WHERE siswa_id = ${siswa_id}`, callback);
      }
    );
  },
};