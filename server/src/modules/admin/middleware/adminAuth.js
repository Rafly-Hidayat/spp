const con = require("../../../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  getAll: (req, res) => {
    con.query("SELECT admin_id, admin_nama FROM admin where admin_id != '0'", (err, rows) => {
      if (err) throw err;
      return res.json(rows);
    });
  },

  // register admin
  register: (req, res) => {
    con.beginTransaction((err) => {
      if (err) res.send(err.sqlMessage, 400);

      const post = {
        admin_nama: req.body.nama,
        admin_email: req.body.email,
        admin_password: req.body.password,
      };

      con.query(
        "SELECT admin_email FROM admin WHERE admin_email = ?",
        [post.admin_email],
        (err, rows) => {
          if (err) res.send(err.sqlMessage, 400);

          if (rows.length == 0) {
            con.query("INSERT INTO admin SET ?", [post], (err) => {
              if (err) return res.send(err.sqlMessage, 400);

              res.json({
                error: false,
                message: "Berhasil menambahkan admin baru",
              });

              con.commit((err) => {
                if (err) {
                  res.send(err.sqlMessage, 400);
                  con.rollback();
                }
              });
            });
          } else {
            res.json({ error: true, message: "Email sudah terdaftar" });
            con.rollback();
          }
        }
      );
    });
  },

  login: (req, res) => {
    const post = {
      admin_password: req.body.password,
      admin_email: req.body.email,
    };

    con.query(
      `SELECT * FROM admin WHERE admin_password = ? AND admin_email = ?`,
      [post.admin_password, post.admin_email],
      (err, rows) => {
        if (err) res.send(err.sqlMessage, 400);

        if (rows.length == 1) {
          let token = jwt.sign({ rows }, process.env.SECRET, {
            expiresIn: 1000,
          });

          const admin_id = rows[0].admin_id;
          let nama = rows.map((obj) => {
            return obj.admin_nama;
          });
          let email = rows.map((obj) => {
            return obj.admin_email;
          });
          let password = rows.map((obj) => {
            return obj.admin_password;
          });
          const data = {
            admin_id: admin_id,
            akses_token: token,
          };

          con.query("INSERT INTO akses_token SET ?", [data], (e, rows) => {
            if (err) return res.send(err.sqlMessage, 400);
            res.json({
              status: true,
              message: "Berhasil menggenerate token",
              token: token,
              admin_id: admin_id,
              nama: nama,
              email: email,
              password: password,
            });
          });
        } else {
          return res.json({
            error: true,
            message: "email atau password salah",
          });
        }
      }
    );
  },

  inventori: (req, res) => {
    res.send("ini adalah halaman inventori");
  },
};
