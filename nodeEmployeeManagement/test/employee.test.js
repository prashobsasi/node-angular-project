const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

jest.mock('../config/db');

describe('Employee CRUD Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /employees/createEmployee', () => {
    it('should create a new employee', async () => {
      const mockEmployee = { id: 1, name: 'John Doe', empid: 'E001', department: 'HR' };

      db.query.mockResolvedValueOnce({ rows: [mockEmployee] });

      const res = await request(app)
        .post('/employees/createEmployee')
        .send({ name: 'John Doe', empid: 'E001', department: 'HR' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockEmployee);
      expect(db.query).toHaveBeenCalledWith(
        'INSERT INTO employee (name, empid, department) VALUES ($1, $2, $3) RETURNING *',
        ['John Doe', 'E001', 'HR']
      );
    });
  });

  describe('GET /employees/getEmployees', () => {
    it('should return all employees', async () => {
      const mockEmployees = [
        { id: 1, name: 'John Doe', empid: 'E001', department: 'HR' },
        { id: 2, name: 'Jane Smith', empid: 'E002', department: 'Finance' },
      ];

      db.query.mockResolvedValueOnce({ rows: mockEmployees });

      const res = await request(app).get('/employees/getEmployees');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockEmployees);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM employee');
    });
  });

  describe('GET /employees/getEmployees/:id', () => {
    it('should return an employee by ID', async () => {
      const mockEmployee = { id: 1, name: 'John Doe', empid: 'E001', department: 'HR' };

      db.query.mockResolvedValueOnce({ rows: [mockEmployee] });

      const res = await request(app).get('/employees/getEmployees/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockEmployee);
      expect(db.query).toHaveBeenCalledWith('SELECT * FROM employee WHERE id=$1', [1]);
    });

    it('should return 404 if employee not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app).get('/employees/getEmployees/999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Employee not found' });
    });
  });

  describe('PUT /employees/updateEmployee/:id', () => {
    it('should update an employee', async () => {
      const mockResponse = { id: 1, name: 'John Doe', empid: 'E001', department: 'HR' };

      db.query.mockResolvedValueOnce({ rows: [mockResponse] });

      const res = await request(app)
        .put('/employees/updateEmployee/1')
        .send({ name: 'John Doe', empid: 'E001', department: 'HR' });

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockResponse);
      expect(db.query).toHaveBeenCalledWith(
        'UPDATE employee SET name=$1, empid=$2, department=$3 WHERE id=$4 RETURNING *',
        ['John Doe', 'E001', 'HR', 1]
      );
    });

    it('should return 404 if employee not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app)
        .put('/employees/updateEmployee/999')
        .send({ name: 'John Doe', empid: 'E001', department: 'HR' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Employee not found' });
    });
  });

  describe('DELETE /employees/deleteEmployee/:id', () => {
    it('should delete an employee', async () => {
      const mockResponse = { id: 1, name: 'John Doe', empid: 'E001', department: 'HR' };

      db.query.mockResolvedValueOnce({ rows: [mockResponse] });

      const res = await request(app).delete('/employees/deleteEmployee/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockResponse);
      expect(db.query).toHaveBeenCalledWith('DELETE FROM employee WHERE id=$1 RETURNING *', [1]);
    });

    it('should return 404 if employee not found', async () => {
      db.query.mockResolvedValueOnce({ rows: [] });

      const res = await request(app).delete('/employees/deleteEmployee/999');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: 'Employee not found' });
    });
  });
});
