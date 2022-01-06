// Import NPM
const express = require('express')
const cors = require('cors')

// Import file
const con = require('./config/db')

const app = express()
const port = 8000

// use NPM
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// connecting route to database
app.use(function (req, res, next) {
  req.con = con
  next()
})

// import admin router
const adminauthRouter = require('./modules/admin/routes/authRouter')
const kelasRouter = require('./modules/admin/routes/kelasRouter')
const posRouter = require('./modules/admin/routes/posRouter')
const periodeRouter = require('./modules/admin/routes/periodeRouter')
const siswaRouter = require('./modules/admin/routes/siswaRouter')
const jurusanRouter = require('./modules/admin/routes/jurusanRouter')
const p_bulananRouter = require('./modules/admin/routes/p_bulananRouter')

// import user router
const siswaauthRouter = require('./modules/user/routes/authRouter')
const profileRouter = require('./modules/user/routes/profileRouter')

// use router
app.use(siswaauthRouter)
app.use(profileRouter)
app.use(adminauthRouter)
app.use(kelasRouter)
app.use(posRouter)
app.use(periodeRouter)
app.use(siswaRouter)
app.use(jurusanRouter)
app.use(p_bulananRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
})