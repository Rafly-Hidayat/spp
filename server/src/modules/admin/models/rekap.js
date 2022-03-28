module.exports = {
  harianBulanan: (con, callback) => {
    let tanggal = new Date().toJSON().slice(0, 10);
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, month_nama, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id WHERE bulanan_tanggal = '${tanggal}' AND bulanan_status = '1'`,
      callback
    );
  },

  harianBebas: (con, callback) => {
    let tanggal = new Date().toJSON().slice(0, 10);
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, d_bebas_deskripsi, d_bebas_bayar, admin_nama
        FROM d_bebas INNER JOIN bebas ON d_bebas.bebas_id = bebas.bebas_id INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN admin ON d_bebas.admin_id = admin.admin_id WHERE d_bebas_tanggal = '${tanggal}'`,
      callback
    );
  },

  laporanBulanan: (con, data, callback) => {
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, month_nama, bulanan_tanggal, periode_mulai, periode_akhir, admin_nama
        FROM bulanan INNER JOIN month ON bulanan.month_id = month.month_id INNER JOIN siswa ON bulanan.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bulanan.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN admin ON bulanan.admin_id = admin.admin_id WHERE bulanan_tanggal BETWEEN '${data.tanggal_awal}' AND '${data.tanggal_akhir}' AND bulanan_status = '1'`,
      callback
    );
  },

  laporanBebas: (con, data, callback) => {
    con.query(
      `SELECT siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama, pos_nama, d_bebas_deskripsi, d_bebas_bayar, d_bebas_tanggal, periode_mulai, periode_akhir, admin_nama
        FROM d_bebas INNER JOIN bebas ON d_bebas.bebas_id = bebas.bebas_id INNER JOIN siswa ON bebas.siswa_id = siswa.siswa_id INNER JOIN kelas ON siswa.kelas_id = kelas.kelas_id INNER JOIN jurusan ON siswa.jurusan_id = jurusan.jurusan_id INNER JOIN d_kelas ON siswa.d_kelas_id = d_kelas.d_kelas_id INNER JOIN pembayaran ON bebas.pembayaran_id = pembayaran.pembayaran_id INNER JOIN pos ON pembayaran.pos_id = pos.pos_id  INNER JOIN periode ON pembayaran.periode_id = periode.periode_id INNER JOIN admin ON d_bebas.admin_id = admin.admin_id WHERE d_bebas_tanggal BETWEEN '${data.tanggal_awal}' AND '${data.tanggal_akhir}'`,
      callback
    );
  },

  laporanKelasBebas: (con, res, data) => {
    con.query(
      `SELECT kelas_id FROM kelas WHERE kelas_id = '${data.kelas_id}'`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
          return res.json({ error: true, message: "Kelas tidak ditemukan" });

        con.query(
          `SELECT jurusan_id FROM jurusan WHERE jurusan_id = '${data.jurusan_id}'`,
          (err, rows) => {
            if (err) throw err;
            if (rows.length == 0)
              return res.json({
                error: true,
                message: "jurusan tidak ditemukan",
              });

            con.query(
              `SELECT d_kelas_id FROM d_kelas WHERE d_kelas_id = '${data.d_kelas_id}'`,
              (err, rows) => {
                if (err) throw err;
                if (rows.length == 0)
                  return res.json({
                    error: true,
                    message: "d_kelas tidak ditemukan",
                  });

                con.query(
                  `SELECT SUM(bebas_tagihan - bebas_total_bayar) as sisa_tagihan, siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN kelas ON kelas.kelas_id = siswa.kelas_id INNER JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id INNER JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE siswa.kelas_id = '${data.kelas_id}' AND siswa.jurusan_id = '${data.jurusan_id}' AND siswa.d_kelas_id = '${data.d_kelas_id}' GROUP BY bebas.siswa_id`,
                  (err, rows) => {
                    if (err) throw err;
                    if (rows.length == 0 || rows[0].siswa_nama == null) {
                      return res.json({
                        error: true,
                        message: "Tidak ada data yang ditemukan",
                      });
                    } else {
                      con.query(
                        `SELECT SUM(bebas_tagihan - bebas_total_bayar) as sisa_tagihan_kelas, pembayaran_id FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN kelas ON kelas.kelas_id = siswa.kelas_id INNER JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id INNER JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE siswa.kelas_id = '${data.kelas_id}' AND siswa.jurusan_id = '${data.jurusan_id}' AND siswa.d_kelas_id = '${data.d_kelas_id}'`,
                        (err, result) => {
                          if (err) throw err;
                          return res.json({
                            error: false,
                            message: "Data ditemukan",
                            data: rows,
                            sisa_tagihan_kelas: result[0].sisa_tagihan_kelas,
                          });
                        }
                      );
                    }
                  }
                );
              }
            );
          }
        );
      }
    );
  },

  laporanKelasBulanan: (con, res, data) => {
    con.beginTransaction((err) => {
      if (err) throw err

      con.query(
        `SELECT kelas_id FROM kelas WHERE kelas_id = '${data.kelas_id}'`,
        (err, rows) => {
          if (err) throw err;
          let kelas = rows.map((obj) => {
            return obj.kelas_id;
          });
          if (rows.length == 0)
            return res.json({ error: true, message: "Kelas tidak ditemukan" });

          con.query(
            `SELECT jurusan_id FROM jurusan WHERE jurusan_id = '${data.jurusan_id}'`,
            (err, rows) => {
              if (err) throw err;
              let jurusan = rows.map((obj) => {
                return obj.jurusan_id;
              });
              if (rows.length == 0)
                return res.json({
                  error: true,
                  message: "jurusan tidak ditemukan",
                });

              con.query(
                `SELECT d_kelas_id FROM d_kelas WHERE d_kelas_id = '${data.d_kelas_id}'`,
                (err, rows) => {
                  if (err) throw err;
                  let d_kelas = rows.map((obj) => {
                    return obj.d_kelas_id;
                  });
                  if (rows.length == 0)
                    return res.json({
                      error: true,
                      message: "d_kelas tidak ditemukan",
                    });

                  con.query(
                    `SELECT bulanan_id,  bulanan_status, bulanan_tagihan, siswa_nama, bulanan.siswa_id FROM bulanan JOIN siswa ON siswa.siswa_id = bulanan.siswa_id JOIN kelas ON kelas.kelas_id = siswa.kelas_id JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE siswa.kelas_id = '${data.kelas_id}' AND siswa.jurusan_id = '${data.jurusan_id}' AND siswa.d_kelas_id = '${data.d_kelas_id}' AND bulanan_status = 0 GROUP BY bulanan.siswa_id`,
                    (err, rows) => {
                      if (err) throw err;
                      let siswa_id = rows.map((obj) => {
                        return obj.siswa_id;
                      });

                      let data = []
                      siswa_id.forEach((element, index) => {
                        con.query(
                          `SELECT SUM(bulanan_tagihan) as tagihan, COUNT(month_id) as sisa_bulan, siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama FROM bulanan JOIN siswa ON siswa.siswa_id = bulanan.siswa_id JOIN kelas ON kelas.kelas_id = siswa.kelas_id JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE bulanan_status = '0' AND bulanan.siswa_id = '${siswa_id[index]}' GROUP BY bulanan.siswa_id`,
                          (err, rows) => {
                            if (err) throw err;

                            data.push({
                              sisa_tagihan: rows[0].tagihan,
                              siswa_nama: rows[0].siswa_nama,
                              kelas_nama: rows[0].kelas_nama,
                              jurusan_nama: rows[0].jurusan_nama,
                              d_kelas_nama: rows[0].d_kelas_nama,
                              sisa_bulan: rows[0].sisa_bulan,
                            })
                          }
                        );
                      });

                      let total_sisa = []
                      siswa_id.forEach((element, index) => {
                        con.query(
                          `SELECT SUM(bulanan_tagihan) as tagihan FROM bulanan WHERE bulanan_status = '0' AND bulanan.siswa_id = '${siswa_id[index]}' GROUP BY bulanan.siswa_id`,
                          (err, rows) => {
                            if (err) throw err;

                            total_sisa.push({
                              sisa_tagihan: rows[0].tagihan,
                            })

                          })
                      })

                      con.commit((err) => {
                        if (data.length == 0) {
                          con.rollback((err) => {
                            if (err) throw err;
                            return res.json({ error: true, message: "Tidak ada data yang ditemukan" })
                          })
                        } else {
                          if (err) throw err;
                          let sum_sisa = 0
                          total_sisa.forEach((element, index) => {
                            sum_sisa += total_sisa[index].sisa_tagihan
                          })
                          return res.json({
                            error: false,
                            message: "Data ditemukan",
                            data: data,
                            sisa_tagihan_kelas: sum_sisa,
                          });
                        }
                      })

                    }
                  );
                }
              );
            }
          );
        }
      );
    })

  },

  laporanAngkatanBebas: (con, res, data) => {
    con.query(
      `SELECT kelas_id FROM kelas WHERE kelas_id = '${data.kelas_id}'`,
      (err, rows) => {
        if (err) throw err;
        if (rows.length == 0)
          return res.json({ error: true, message: "Kelas tidak ditemukan" });

        con.query(
          `SELECT SUM(bebas_tagihan - bebas_total_bayar) as sisa_tagihan, siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN kelas ON kelas.kelas_id = siswa.kelas_id INNER JOIN jurusan ON jurusan.jurusan_id  = siswa.jurusan_id INNER JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE siswa.kelas_id = '${data.kelas_id}' GROUP BY bebas.siswa_id`,
          (err, rows) => {
            if (err) throw err;
            if (rows.length == 0 || rows[0].siswa_nama == null) {
              return res.json({
                error: true,
                message: "Tidak ada data yang ditemukan",
              });
            } else {
              con.query(
                `SELECT SUM(bebas_tagihan - bebas_total_bayar) as sisa_tagihan_angkatan FROM bebas INNER JOIN siswa ON siswa.siswa_id = bebas.siswa_id INNER JOIN kelas ON kelas.kelas_id = siswa.kelas_id WHERE siswa.kelas_id = '${data.kelas_id}'`,
                (err, result) => {
                  if (err) throw err;
                  return res.json({
                    error: false,
                    message: "Data ditemukan",
                    data: rows,
                    sisa_tagihan_kelas: result[0].sisa_tagihan_angkatan,
                  });
                }
              );
            }
          }
        );
      })
  },

  laporanAngkatanBulanan: (con, res, data) => {
    con.beginTransaction((err) => {
      if (err) throw err

      con.query(
        `SELECT kelas_id FROM kelas WHERE kelas_id = '${data.kelas_id}'`,
        (err, rows) => {
          if (err) throw err;
          let kelas = rows.map((obj) => {
            return obj.kelas_id;
          });
          if (rows.length == 0) {
            con.rollback((err) => {
              if (err) throw err;
              return res.json({ error: true, message: "Kelas tidak ditemukan" })
            })
          }

          con.query(
            `SELECT bulanan_id,  bulanan_status, bulanan_tagihan, siswa_nama, bulanan.siswa_id FROM bulanan JOIN siswa ON siswa.siswa_id = bulanan.siswa_id JOIN kelas ON kelas.kelas_id = siswa.kelas_id JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE siswa.kelas_id = '${data.kelas_id}' AND bulanan_status = 0 GROUP BY bulanan.siswa_id`,
            (err, rows) => {
              if (err) throw err;
              let siswa_id = rows.map((obj) => {
                return obj.siswa_id;
              });

              let data = []
              siswa_id.forEach((element, index) => {
                con.query(
                  `SELECT SUM(bulanan_tagihan) as tagihan, COUNT(month_id) as sisa_bulan, siswa_nama, kelas_nama, jurusan_nama, d_kelas_nama FROM bulanan JOIN siswa ON siswa.siswa_id = bulanan.siswa_id JOIN kelas ON kelas.kelas_id = siswa.kelas_id JOIN jurusan ON jurusan.jurusan_id = siswa.jurusan_id JOIN d_kelas ON d_kelas.d_kelas_id = siswa.d_kelas_id WHERE bulanan_status = '0' AND bulanan.siswa_id = '${siswa_id[index]}' GROUP BY bulanan.siswa_id`,
                  (err, rows) => {
                    if (err) throw err;

                    data.push({
                      sisa_tagihan: rows[0].tagihan,
                      siswa_nama: rows[0].siswa_nama,
                      kelas_nama: rows[0].kelas_nama,
                      jurusan_nama: rows[0].jurusan_nama,
                      d_kelas_nama: rows[0].d_kelas_nama,
                      sisa_bulan: rows[0].sisa_bulan,
                    })
                  }
                );
              });

              let total_sisa = []
              siswa_id.forEach((element, index) => {
                con.query(
                  `SELECT SUM(bulanan_tagihan) as tagihan FROM bulanan WHERE bulanan_status = '0' AND bulanan.siswa_id = '${siswa_id[index]}' GROUP BY bulanan.siswa_id`,
                  (err, rows) => {
                    if (err) throw err;

                    total_sisa.push({
                      sisa_tagihan: rows[0].tagihan,
                    })

                  })
              })

              con.commit((err) => {
                if (data.length == 0) {
                  con.rollback((err) => {
                    if (err) throw err;
                    return res.json({ error: true, message: "Tidak ada data yang ditemukan" })
                  })
                } else {
                  if (err) throw err;
                  let sum_sisa = 0
                  total_sisa.forEach((element, index) => {
                    sum_sisa += total_sisa[index].sisa_tagihan
                  })
                  return res.json({
                    error: false,
                    message: "Data ditemukan",
                    data: data,
                    sisa_tagihan_kelas: sum_sisa,
                  });
                }
              })
            }
          );
        }
      );
    })
  }

};
