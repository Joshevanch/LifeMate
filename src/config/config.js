const { Client } = require('pg')

const db = new Client({
    host : '34.101.188.135',
    user : 'postgres',
    port : 5432,
    database : 'lifemate',
    ssl: { rejectUnauthorized: false }

})

db.connect((err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Database berhasil terkoneksi')
})

module.exports = db;