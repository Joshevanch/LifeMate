const { Client } = require('pg')

const db = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5432,
    password : '',
    database : 'lifemate',
})

db.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Database berhasil terkoneksi')
})

module.exports = db;