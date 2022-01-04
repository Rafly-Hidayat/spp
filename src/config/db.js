// connect to database
const mysql = require('mysql')
const env = require('dotenv')

env.config()

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

con.connect((err) => {
    err ? console.log('DATABASE NOT CONNECTED!') : console.log('CONNECTED TO DATABASE!')
})

module.exports = con