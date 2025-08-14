const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM pendientes WHERE estado="P"', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { titulo, observacion,estado } = req.body;
  db.query('INSERT INTO pendientes (titulo, observacion) VALUES (?, ?)', [titulo, observacion], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(201);
  });
});

router.put('/:id', (req, res) => {
  const { titulo, observacion } = req.body;
  db.query('UPDATE pendientes SET titulo = ?, observacion = ? WHERE id = ?', [titulo, observacion, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  db.query('UPDATE pendientes SET estado="T" WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

router.get('/finalizados', (req, res) => {
  db.query('SELECT * FROM pendientes WHERE estado = "T"', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});
// Reactivar un pendiente finalizado (estado "T" → "P")
router.put('/reactivar/:id', (req, res) => {
  db.query('UPDATE pendientes SET estado="P" WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});



module.exports = router;
