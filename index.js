const express = require('express');
const path = require('path');
const itemsRouter = require('./routes/items');  // Importing items routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(express.urlencoded({ extended: true }));  // For parsing form data
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files (e.g., CSS, JS, images)

// Routes
app.use('/api/items', itemsRouter);  // API routes for item CRUD operations

// Default route to serve front-end HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve the static HTML page
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
