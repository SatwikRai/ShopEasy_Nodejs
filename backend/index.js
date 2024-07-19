const express = require('express');

const productRoutes = require('./routes/productRoutes');
const connectDB =require('./config/database');

const morgan =require('morgan');

const app = express();



connectDB();
// Database Connection
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use(productRoutes);

// Start the server
const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
