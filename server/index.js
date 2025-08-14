const express = require('express');
const cors = require('cors');
const app = express();
const pendientesRoutes = require('./routes/pendientes');





app.use(cors());
app.use(express.json());
app.use('/pendientes', pendientesRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en http://192.168.1.20:3001');
});

