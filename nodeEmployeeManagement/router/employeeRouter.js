// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');

// Define CRUD routes
router.post('/createEmployee', employeeController.createEmployee);
router.get('/getEmployees', employeeController.getAllEmployees );
router.get('/getEmployees/:id', employeeController.getEmployeeById);
router.put('/updateEmployee/:id', employeeController.updateEmployee);
router.delete('/deleteEmployee/:id', employeeController.deleteEmployee);

module.exports = router;

