const { Client } = require('pg');

const db = new Client({
  host: 'dpg-d2f0mc49c44c739gpgc0-a.oregon-postgres.render.com', // host completo de Render
  port: 5432,
  user: 'pendientes_qpqm_user',
  password: 'egqTxo1SdPbsnoiTRQ8NM9SvQZgNWeEd',
  database: 'pendientes_qpqm',
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => console.log('Conectado a PostgreSQL'))
  .catch(err => console.error('Error de conexión', err.stack));

module.exports = db;
