const Item = require('../models/item');  // Assuming you're using an ORM like Sequelize

// Controller to create a new item
const createItem = (req, res) => {
  const { name, description, image } = req.body;
  Item.create({ name, description, image })
    .then(newItem => res.status(201).json(newItem))  // Respond with the new item
    .catch(err => res.status(500).json({ error: err.message }));
};

// Controller to delete an item
const deleteItem = (req, res) => {
  const itemId = req.params.id;

  Item.destroy({
    where: { id: itemId }
  })
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: 'Item deleted successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Export controllers
module.exports = {
  createItem,
  deleteItem
};
