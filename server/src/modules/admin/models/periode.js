module.exports = {
    getAll: (con, callback) => {
        con.query("SELECT * FROM periode", callback)
    },

    getById: (con, periode_id, callback) => {
        con.query(`SELECT * FROM periode WHERE periode_id = ${periode_id}`, callback)
    },

    add: (con, data, callback) => {
        const query = `INSERT INTO periode SET 
                                periode_mulai = '${data.periode_mulai}',
                                periode_akhir = '${data.periode_akhir}'`
        con.query(query, callback)
    },

    update: (con, data, periode_id, res, callback) => {
        con.query(`SELECT * FROM periode WHERE periode_id = ${periode_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('periode_id periode tidak ditemukan.', 404)
            const query = `UPDATE periode SET
                                    periode_mulai = '${data.periode_mulai}',
                                    periode_akhir = '${data.periode_akhir}'
                                    WHERE periode_id = ${periode_id}`
            con.query(query, callback)
        })
    },

    delete: (con, periode_id, res, callback) => {
        con.query(`SELECT * FROM periode WHERE periode_id = ${periode_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('periode_id tidak ditemukan.', 404)
            con.query(`DELETE FROM periode WHERE periode_id = ${periode_id}`, callback)
        })
    }
}