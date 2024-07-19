const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'bsohvhmcnnoqdihu62lh-mysql.services.clever-cloud.com',
    user: 'ua00o07km5jbw0yc',
    password: 'io8x5FvrD37XhN8CbnpX',
    database: 'bsohvhmcnnoqdihu62lh'
})

db.connect((err)=>{
   if(err) throw err
   console.log('Connected to Mysql DB')
})

module.exports = db