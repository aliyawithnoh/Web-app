const db = require('../db/database'); // Import database connection

// Model function to get all items
const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM items', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Model function to get an item by ID
const getItemById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM items WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Model function to create a new item
const createItem = (name, description, image) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO items (name, description, image, date_created) VALUES (?, ?, ?, ?)';
    const dateCreated = new Date().toISOString();
    db.run(query, [name, description, image, dateCreated], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID });
      }
    });
  });
};

// Model function to update an existing item
const updateItem = (id, name, description, image) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE items SET name = ?, description = ?, image = ? WHERE id = ?';
    db.run(query, [name, description, image, id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id, name, description, image });
      }
    });
  });
};

// Model function to delete an item by ID
const deleteItem = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id });
      }
    });
  });
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
