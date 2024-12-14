const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql.freedb.tech',
  user: 'freedb_sampath',
  password: 'KXhFA#RBH5bkJs&', // Add your MySQL password
  database: 'freedb_receipe_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

module.exports = db;