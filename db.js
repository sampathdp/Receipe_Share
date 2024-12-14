const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'BfRztFGwpOFpQzsyPkPMkTSEBYjYAjtY', // Add your MySQL password
  database: 'railway',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

module.exports = db;