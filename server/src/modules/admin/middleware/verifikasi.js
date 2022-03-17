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
        console.log(decoded);
        if (err) {
          return rest.send(
            { auth: false, message: "Token tidak terdaftar" },
            400
          );
        } else {
          req.auth = decoded;
          next();
        }
      });
    } else {
      return rest.send({ auth: false, message: "Token tidak tersedia" }, 400);
    }
  };
}

module.exports = { verifikasiAdmin };
