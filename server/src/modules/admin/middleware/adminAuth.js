const con = require("../../../config/db");
const jwt = require("jsonwebtoken");
const env = require('dotenv')

env.config()
module.exports = {
  getAll: (req, res) => {
    con.query("SELECT admin_id, admin_nama FROM admin where admin_id != '0'", (err, rows) => {
      if (err) throw err;
      return res.json(rows);
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
        let data = rows[0].admin_nama
        if (rows.length == 1) {
          let token = jwt.sign({ data }, process.env.SECRET, {
            expiresIn: "24h",
          });

          const admin_id = rows[0].admin_id;
          const nama = rows[0].admin_nama;

          con.query(`INSERT INTO akses_token SET admin_id = ${admin_id}, akses_token = '${token}'`, (err) => {
            if (err) return res.send(err.sqlMessage, 400);
            res.json({
              status: true,
              message: "Berhasil menggenerate token",
              token: token,
              admin_id: admin_id,
              nama: nama
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
  }
};