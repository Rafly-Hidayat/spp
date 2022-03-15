// Import NPM
const express = require("express");
const cors = require("cors");
const path = require("path");

// Import file
const con = require("./config/db");

let uploaded = require("express-fileupload");
// let importExcel = require("convert-excel-to-json");
// let del = require("del");

const app = express();
const port = 8000;

// use NPM

//route for post data
// app.post("/upload", upload.single('img'), (req, res) => {
//   if (!req.file) {
//       return res.send("No file upload");
//   } else {
//       console.log(req.file.filename)
//       var imgsrc = 'http://127.0.0.1:8000/public/images/' + req.file.filename
//       var insertData = "INSERT INTO users_file SET file_src = ?"
//       con.query(insertData, [imgsrc], (err, result) => {
//           if (err) throw err
//           return res.send("file uploaded")
//       })
//   }
// });

// app.use(multer({storage: storage}))
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(uploaded());

// connecting route to database
app.use(function (req, res, next) {
  req.con = con;
  next();
});


// import admin router
const adminauthRouter = require("./modules/admin/routes/authRouter");
const kelasRouter = require("./modules/admin/routes/kelasRouter");
const d_kelasRouter = require("./modules/admin/routes/d_kelasRouter");
const posRouter = require("./modules/admin/routes/posRouter");
const periodeRouter = require("./modules/admin/routes/periodeRouter");
const siswaRouter = require("./modules/admin/routes/siswaRouter");
const jurusanRouter = require("./modules/admin/routes/jurusanRouter");
const admin_p_bulananRouter = require("./modules/admin/routes/p_bulananRouter");
const pembayaranRouter = require("./modules/admin/routes/pembayaranRouter");
const admin_p_bebasRouter = require("./modules/admin/routes/p_bebasRouter");
const kenaikan_kelasRouter = require("./modules/admin/routes/kenaikan_kelasRouter");

// import user router
const siswaauthRouter = require("./modules/user/routes/authRouter");
const profileRouter = require("./modules/user/routes/profileRouter");
const user_p_bulananRouter = require("./modules/user/routes/p_bulananRouter");
const user_p_bebasRouter = require("./modules/user/routes/p_bebasRouter");

// use router user
app.use(siswaauthRouter);
app.use(profileRouter);
app.use(user_p_bulananRouter);
app.use(user_p_bebasRouter);

// use router admin
app.use(adminauthRouter);
app.use(kelasRouter);
app.use(posRouter);
app.use(periodeRouter);
app.use(d_kelasRouter);
app.use(siswaRouter);
app.use(jurusanRouter);
app.use(admin_p_bulananRouter);
app.use(pembayaranRouter);
app.use(admin_p_bebasRouter);
app.use(kenaikan_kelasRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
