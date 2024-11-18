const db = require('../models/database');

exports.getItems = (req, res) => {
  db.all('SELECT * FROM items', [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.render('index', { items: rows });
  });
};

exports.addItem = (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).send('Name is required.');
  
  const sql = 'INSERT INTO items (name, description) VALUES (?, ?)';
  db.run(sql, [name, description || null], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};

exports.updateItem = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const sql = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
  db.run(sql, [name, description || null, id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM items WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) return res.status(500).send(err.message);
    res.redirect('/');
  });
};
