const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is in app.js
const employeeService = require('../../service/employeeService');

// Mock the employeeService
jest.mock('../../service/employeeService');

describe('Employee Controller', () => {
  // Mock Database Connection
  beforeAll(() => {
    jest.mock('../../config/db', () => ({
      connect: jest.fn().mockResolvedValue(true),
    }));
  });

  describe('POST /employees/createEmployee', () => {
    it('should create a new employee', async () => {
      const newEmployee = { name: 'John Doe', empid: '123', department: 'HR' };
      employeeService.createEmployee.mockResolvedValue(newEmployee);

      const response = await request(app)
        .post('/employees/createEmployee')
        .send(newEmployee);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newEmployee);
    });

    it('should handle errors when creating an employee', async () => {
      const errorMessage = 'Failed to create employee';
      employeeService.createEmployee.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/employees/createEmployee')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('GET /employees/getEmployees', () => {
    it('should get all employees', async () => {
      const employees = [{ id: 1, name: 'John Doe', empid: '123', department: 'HR' }];
      employeeService.getAllEmployees.mockResolvedValue(employees);

      const response = await request(app).get('/employees/getEmployees');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(employees);
    });

    it('should handle errors when fetching all employees', async () => {
      const errorMessage = 'Failed to fetch employees';
      employeeService.getAllEmployees.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/employees/getEmployees');

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('GET /employees/getEmployees/:id', () => {
    it('should get an employee by ID', async () => {
      const employee = { id: 1, name: 'John Doe', empid: '123', department: 'HR' };
      employeeService.getEmployeeById.mockResolvedValue(employee);

      const response = await request(app).get('/employees/getEmployees/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(employee);
    });

    it('should handle employee not found', async () => {
      const errorMessage = 'Employee not found';
      employeeService.getEmployeeById.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/employees/getEmployees/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessage);
    });

    it('should handle errors when getting an employee', async () => {
      const errorMessage = 'Failed to fetch employee';
      employeeService.getEmployeeById.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).get('/employees/getEmployees/1');

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('PUT /employees/updateEmployee/:id', () => {
    it('should update an employee by ID', async () => {
      const updatedEmployee = { id: 1, name: 'John Does', empid: '12345', department: 'Trade' };
      employeeService.updateEmployee.mockResolvedValue(updatedEmployee);

      const response = await request(app)
        .put('/employees/updateEmployee/1')
        .send(updatedEmployee);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedEmployee);
    });

    it('should handle employee not found when updating', async () => {
      const errorMessage = 'Employee not found';
      employeeService.updateEmployee.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .put('/employees/updateEmployee/1')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessage);
    });

    it('should handle errors when updating an employee', async () => {
      const errorMessage = 'Failed to update employee';
      employeeService.updateEmployee.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .put('/employees/updateEmployee/1')
        .send({ name: 'John Doe' });

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });

  describe('DELETE /employees/deleteEmployee/:id', () => {
    it('should delete an employee by ID', async () => {
      const deletedEmployee = { id: 1, name: 'John Doe', empid: '123', department: 'HR' };
      employeeService.deleteEmployee.mockResolvedValue(deletedEmployee);

      const response = await request(app).delete('/employees/deleteEmployee/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(deletedEmployee);
    });

    it('should handle employee not found when deleting', async () => {
      const errorMessage = 'Employee not found';
      employeeService.deleteEmployee.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/employees/deleteEmployee/1');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(errorMessage);
    });

    it('should handle errors when deleting an employee', async () => {
      const errorMessage = 'Failed to delete employee';
      employeeService.deleteEmployee.mockRejectedValue(new Error(errorMessage));

      const response = await request(app).delete('/employees/deleteEmployee/1');

      expect(response.status).toBe(500);
      expect(response.text).toBe(errorMessage);
    });
  });
});
