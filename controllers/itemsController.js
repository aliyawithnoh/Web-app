// Get all items
const getItems = (req, res) => {
  Item.findAll()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(500).json({ error: err.message }));
};

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


// Get a single item by ID
const getItem = (req, res) => {
  const itemId = req.params.id;
  Item.findByPk(itemId)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Update an existing item
const updateItem = (req, res) => {
  const itemId = req.params.id;
  const { name, description, image } = req.body;

  Item.update({ name, description, image }, { where: { id: itemId } })
    .then(([rowsUpdated]) => {
      if (rowsUpdated) {
        res.status(200).json({ message: 'Item updated successfully' });
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem
};
