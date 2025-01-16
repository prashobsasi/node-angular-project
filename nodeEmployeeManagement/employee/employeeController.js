const db = require('../config/db');

// Create employee
const createEmployee = (req, res) => {
  const { name, empid, department } = req.body;
  const insertQuery = 'INSERT INTO employee (name, empid, department) VALUES ($1, $2, $3) RETURNING *';
  db.query(insertQuery, [name, empid, department])
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => res.status(500).send(err));
};

// Get all employees
const getEmployees = (req, res) => {
  const getQuery = 'SELECT * FROM employee';
  db.query(getQuery)
    .then(result => res.status(200).json(result.rows))
    .catch(err => res.status(500).send(err));
};

// Get employee by ID
const getEmployeeById = (req, res) => {
  const id = parseInt(req.params.id, 10); // Ensure id is a number
  const getByIdQuery = 'SELECT * FROM employee WHERE id=$1';
  db.query(getByIdQuery, [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send({ message: 'Employee not found' });
      }
    })
    .catch(err => res.status(500).send(err));
};

// Update employee
const updateEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10); // Ensure id is a number
  const { name, empid, department } = req.body;
  const updateQuery = 'UPDATE employee SET name=$1, empid=$2, department=$3 WHERE id=$4 RETURNING *';
  db.query(updateQuery, [name, empid, department, id])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send({ message: 'Employee not found' });
      }
    })
    .catch(err => res.status(500).send(err));
};

// Delete employee
const deleteEmployee = (req, res) => {
  const id = parseInt(req.params.id, 10); // Ensure id is a number
  const deleteQuery = 'DELETE FROM employee WHERE id=$1 RETURNING *';
  db.query(deleteQuery, [id])
    .then(result => {
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).send({ message: 'Employee not found' });
      }
    })
    .catch(err => res.status(500).send(err));
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
