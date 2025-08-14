const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'dpg-d2f0mc49c44c739gpgc0-a',
  user: 'pendientes_qpqm_user',
  password: 'egqTxo1SdPbsnoiTRQ8NM9SvQZgNWeEd',
  database: 'pendientes_qpqm'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

module.exports = db;
