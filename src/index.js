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

// import router
const adminauthRouter = require('./modules/admin/routes/authRouter')
const siswaauthRouter = require('./modules/user/routes/authRouter')
const kelasRouter = require('./modules/admin/routes/kelasRouter')

// use router
app.use(adminauthRouter)
app.use(siswaauthRouter)
app.use(kelasRouter)

// connecting route to database
app.use(function (req, res, next) {
  req.con = con
  next()
})

app.listen(port, () => {
  console.log(`Server running on port ${port}!`)
})