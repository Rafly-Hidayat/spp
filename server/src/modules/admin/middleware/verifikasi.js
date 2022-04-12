const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifikasiAdmin() {
  return (req, rest, next) => {
    // cek authorization
    const tokenBearer = req.headers.authorization;
    if (tokenBearer) {
      const token = tokenBearer.split(" ")[1];

      // verifikasi
      jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if (err) {
          return rest.json(
            { error: true, message: "Token tidak terdaftar" },
            400
          );
        } else {
          req.auth = decoded;
          next();
        }
      });
    } else {
      return rest.json({ error: true, message: "Token tidak tersedia" }, 400);
    }
  };
}

module.exports = { verifikasiAdmin };