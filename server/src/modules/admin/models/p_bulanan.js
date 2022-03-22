function makeNoTransaksi(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  // value = "BLN - " + result;
  return result;
}

module.exports = {
  getAll: (con, callback) => {
    con.query(
      `SELECT bulanan_id, no_transaksi, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id`,
      callback
    );
  },

  getById: (con, bulanan_id, callback) => {
    con.query(
      `SELECT bulanan_id, no_transaksi, month.month_id, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id
        WHERE bulanan_id = ${bulanan_id}`,
      callback
    );
  },

  getByNis: (con, siswa_nis, callback) => {
    con.query(
      `SELECT bulanan_id, no_transaksi,month.month_id, month_nama, siswa_nis, siswa_nama, kelas_nama, jurusan_nama,
        pembayaran_tipe, periode_mulai, periode_akhir, pos_nama,bulanan_tagihan, bulanan_status, bulanan_tanggal, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id
        WHERE siswa_nis = ${siswa_nis}`,
      callback
    );
  },

  getTotal: (con, callback) => {
    con.query(`SELECT COUNT(*) FROM bulanan`, callback);
  },

  getP_id: (con, bulanan_id, callback) => {
    con.query(
      `SELECT pembayaran_id FROM bulanan WHERE bulanan_id = ${bulanan_id}`,
      callback
    );
  },

  bayar: (con, res, bulanan_id, data, callback) => {
    let tanggal = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    con.query(
      `SELECT bulanan_id, pos_nama FROM bulanan INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id WHERE bulanan_id = ${bulanan_id}`,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Id pembayaran bulanan tidak ditemukan.'",
          });
        
        let pos = rows[0].pos_nama
        let tgl = new Date(tanggal)
        let d = tgl.getDate()
        let m = tgl.toJSON().slice(5, 7)
        let y = tgl.toJSON().slice(2, 4)
        // noTransaksi = pos + "/" + makeNoTransaksi(8);
        let noTransaksi = pos + "/" + d + m + y + "/" + makeNoTransaksi(6);
        con.query(
          `UPDATE bulanan SET bulanan_status = '1',
                        bulanan_tanggal = '${tanggal}', admin_id = '${data.admin_id}', no_transaksi = '${noTransaksi}'  WHERE bulanan_id = ${bulanan_id}`,
          callback
        );
      }
    );
  },

  add: (con, data, res) => {
    con.beginTransaction((err) => {
      if (err) throw err;
      con.query(
        `SELECT siswa_id FROM siswa WHERE kelas_id = '${data.kelas}'`,
        (err, rows) => {
          if (err) throw err;
          if (rows == 0)
            return res.json({
              error: true,
              message: "Id kelas tidak ditemukan.'",
            });
          let siswa = rows.map((obj) => {
            return obj.siswa_id;
          });
          const a = Array.from(siswa).values();
          const b = a.next().value;

          con.query(
            `SELECT pembayaran_id FROM pembayaran WHERE pembayaran_id = '${data.pembayaran_id}'`,
            (err, rows) => {
              if (err) throw err;
              if (rows == 0)
                return res.json({
                  error: true,
                  message: "Id pembayaran tidak ditemukan.'",
                });
              let pembayaran = rows.map((obj) => {
                return obj.pembayaran_id;
              });
              const x = Array.from(pembayaran).values();
              const y = x.next().value;

              con.query(
                `SELECT siswa_id, pembayaran_id FROM bulanan WHERE siswa_id = '${b}' AND pembayaran_id = '${y}' `,
                (err, rows) => {
                  if (err) throw err;
                  let siswa_id = rows.map((obj) => {
                    return obj.siswa_id;
                  });

                  let pembayaran_id = rows.map((obj) => {
                    return obj.pembayaran_id;
                  });

                  con.query(`SELECT * FROM month`, (err, rows) => {
                    if (err) throw err;
                    let month = rows.map((obj) => {
                      return obj.month_id;
                    });

                    if (
                      Array.from(siswa_id).length == 0 &&
                      Array.from(pembayaran_id).length == 0
                    ) {
                      const jumlah_siswa = siswa.length;
                      const jumlah_bulan = month.length;
                      for (let i = 0; i < jumlah_siswa; i++) {
                        for (let j = 0; j < jumlah_bulan; j++) {
                          con.query(
                            `INSERT INTO bulanan SET siswa_id = '${siswa[i]}', pembayaran_id = '${data.pembayaran_id}', bulanan_tagihan = '${data.tagihan}', month_id = '${month[j]}', bulanan_status = '0'`
                          );
                        }
                      }
                    } else {
                      con.rollback();
                      return res.json({
                        error: true,
                        message:
                          "Seluruh siswa di kelas tersebut sudah di atur tagihannya untuk pembayaran ini",
                      });
                    }

                    con.commit((err) => {
                      if (err) con.rollback();
                      return res.json({
                        error: false,
                        message: "Set tarif berhasil",
                      });
                    });
                  });
                }
              );
            }
          );
        }
      );
    });
  },

  invoice: (con, bulanan_id, res) => {
    con.query(
      `
        SELECT bulanan_id, bulanan_tanggal, no_transaksi, admin_nama, pos_nama, month_nama, siswa_nama, siswa_nis, kelas_nama, jurusan_nama, d_kelas_nama FROM bulanan INNER JOIN admin ON bulanan.admin_id = admin.admin_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id WHERE bulanan.bulanan_id = '${bulanan_id}'
      `,
      (err, rows) => {
        if (err) throw err;
        if (rows == 0)
          return res.json({
            error: true,
            message: "Data pembayaran siswa tidak ditemukan.",
          });
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
        const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"]
        let d = new Date(rows[0].bulanan_tanggal.toString())

        res.json({
          bulanan_id: rows[0].bulanan_id,
          month_nama: rows[0].month_nama,
          tanggal:
            days[d.getDay()] +
            ", " +
            d.getDate() +
            " " +
            months[d.getMonth()] +
            " " +
            d.getFullYear(),
          no_transaksi: rows[0].no_transaksi,
          admin_nama: rows[0].admin_nama,
          siswa_nama: rows[0].siswa_nama,
          siswa_nis: rows[0].siswa_nis,
          kelas_nama: rows[0].kelas_nama,
          jurusan_nama: rows[0].jurusan_nama,
          d_kelas_nama: rows[0].d_kelas_nama,
          pos_nama: rows[0].pos_nama,
        });
      }
    );
  },
};
