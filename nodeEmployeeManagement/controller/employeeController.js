const employeeService = require('../service/employeeService');

const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const employee = await employeeService.createEmployee(req.body);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(parseInt(req.params.id, 10));
    res.status(200).json(employee);
  } catch (error) {
    if (error.message === 'Employee not found') {
      res.status(404).send({ message: error.message });
    } else {
      res.status(500).send(error.message);
    }
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(parseInt(req.params.id, 10), req.body);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    if (error.message === 'Employee not found') {
      res.status(404).send({ message: error.message });
    } else {
      res.status(500).send(error.message);
    }
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await employeeService.deleteEmployee(parseInt(req.params.id, 10));
    res.status(200).json(deletedEmployee);
  } catch (error) {
    if (error.message === 'Employee not found') {
      res.status(404).send({ message: error.message });
    } else {
      res.status(500).send(error.message);
    }
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
