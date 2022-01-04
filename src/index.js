// Import NPM
import express, { json, urlencoded } from 'express'
import cors from 'cors'
  
// Import file
import con from './config/db.js'

const app = express()
const port = 8000


app.use(json()) // for parsing application/json
app.use(urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// connecting route to database
app.use(function(req, res, next) {
    req.con = con
    next()
  })

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})