var Module = require("module");
var fs = require("fs");
// let upload = require("express-fileupload");
let importExcel = require("convert-excel-to-json");
let del = require("del");

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

  upload: (con, data, res) => {
	con.beginTransaction((err) => {
		if (err) throw err;
		let file = data
		let filename = file.name;
		
		file.mv("./public/" + filename, function (err) {
		  if (err) {
			res.send("gagal upload");
		  } else {
			let result = importExcel({
			  sourceFile: "./public/" + filename,
			  header: { rows: 1 },
			  columnToKey: {
				A: "siswa_nis",
				B: "siswa_nama",
				C: "siswa_password",
				D: "siswa_gender",
				E: "siswa_img",
				F: "kelas_id",
				G: "jurusan_id",
				H: "d_kelas_id",
			  },
			  sheets: ["Sheet1"],
			});
			for (let i = 0; result.Sheet1.length > i; i++) {
			  con.query(
				`SELECT siswa_nis FROM siswa WHERE siswa_nis = ${result.Sheet1[i].siswa_nis}`,
				(err, rows) => {
				  if (err) throw err;
				  let password = makeid(8);
				  if (rows.length == 0) {
					con.query(
					  `INSERT INTO siswa SET siswa_nis = '${result.Sheet1[i].siswa_nis}', siswa_nama = '${result.Sheet1[i].siswa_nama}', siswa_password = '${password}', siswa_gender = '${result.Sheet1[i].siswa_gender}', siswa_img = 'profile.png', kelas_id = '${result.Sheet1[i].kelas_id}', jurusan_id = '${result.Sheet1[i].jurusan_id}', d_kelas_id = '${result.Sheet1[i].d_kelas_id}'`
					);
				  } else {
					con.rollback()
					return res.json({
						error : true,
						message :'NIS sudah terdaftar'
					})
				  }

				con.commit(err => {
					if (err) con.rollback()
					return res.send('Upload siswa berhasil', 200)
				})

				}
			  );
			}
		  }
		});
	});
  },

  update: (con, data, siswa_id, res) => {
    con.query(
      `SELECT * FROM siswa WHERE siswa_id = ${siswa_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0) return res.send("siswa_id siswa tidak ditemukan.", 404);

        con.query(
          `UPDATE siswa SET siswa_nis = '${data.nis}', siswa_nama = '${data.nama}', siswa_gender = '${data.gender}', kelas_id = '${data.kelas}', jurusan_id = '${data.jurusan}', d_kelas_id = '${data.d_kelas}' WHERE siswa_id = '${siswa_id}'`,
          (err) => {
            if (err)
              return res.json({ error: true, message: "NIS sudah terdaftar" });

            return res.json({ error: false, message: "Berhasil update siswa" });
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
        if (rows == 0) return res.send("siswa_id tidak ditemukan.", 404);
        con.query(`DELETE FROM siswa WHERE siswa_id = ${siswa_id}`, callback);
      }
    );
  },
};
