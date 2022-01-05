module.exports = {
    getAll: (con, callback) => {
        con.query("SELECT * FROM pos", callback)
    },

    getById: (con, pos_id, callback) => {
        con.query(`SELECT * FROM pos WHERE pos_id = ${pos_id}`, callback)
    },

    add: (con, data, callback) => {
        const query = `INSERT INTO pos SET 
                                pos_nama = '${data.pos_nama}',
                                pos_deskripsi = '${data.pos_deskripsi}'`
        con.query(query, callback)
    },

    update: (con, data, pos_id, res, callback) => {
        con.query(`SELECT * FROM pos WHERE pos_id = ${pos_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('pos_id pos tidak ditemukan.', 404)
            const query = `UPDATE pos SET
                                    pos_nama = '${data.pos_nama}',
                                    pos_deskripsi = '${data.pos_deskripsi}'
                                    WHERE pos_id = ${pos_id}`
            con.query(query, callback)
        })
    },

    delete: (con, pos_id, res, callback) => {
        con.query(`SELECT * FROM pos WHERE pos_id = ${pos_id}`, (err, rows) => {
            if (err) throw err
            if (rows == 0) return res.send('pos_id tidak ditemukan.', 404)
            con.query(`DELETE FROM pos WHERE pos_id = ${pos_id}`, callback)
        })
    }
}