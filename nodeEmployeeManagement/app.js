// app.js
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('./config/db');  // Importing the DB connection
const employeeRoutes = require('./employee/employeeRouter');  // Importing employee routes

const app = express();

// Swagger setup
const swaggerDocs = YAML.load('./swagger/crudSwagger.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use('/employees', employeeRoutes);  // Use employee routes for all employee-related actions

app.listen(3000, () => {
  console.log('Server Running on port 3000');
});

module.exports = app;
