// connect to database
import { createConnection } from 'mysql'
import env from 'dotenv'

env.config()

const con = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

con.connect((err) => {
    err ? console.log('DATABASE NOT CONNECTED!') : console.log('CONNECTED TO DATABASE!')
})

export default con