const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql304.infinityfree.com',
  user: 'if0_37557751',
  password: 'Sampath10', // Add your MySQL password
  database: 'if0_37557751_recipe_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

module.exports = db;