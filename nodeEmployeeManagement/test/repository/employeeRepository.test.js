const db = require('../../config/db');
const employeeService = require('../../service/employeeService'); // Adjust path as needed

jest.mock('../../config/db', () => ({
  connect: jest.fn().mockResolvedValue({
    query: jest.fn(),
    release: jest.fn(),
  }),
}));

describe('Employee Service', () => {
  let client;

  beforeEach(async () => {
    client = await db.connect(); // Mock db connection
    client.query.mockReset(); // Reset mocks before each test
  });

  describe('createEmployee', () => {
    it('should create a new employee and return the employee data', async () => {
      const employee = { name: 'John Doe', empid: '123', department: 'HR' };
      const mockResult = { rows: [employee] };
      client.query.mockResolvedValue(mockResult);

      const result = await employeeService.createEmployee(employee);

      expect(client.query).toHaveBeenCalledWith(
        'INSERT INTO employee (name, empid, department) VALUES ($1, $2, $3) RETURNING *',
        [employee.name, employee.empid, employee.department]
      );
      expect(result).toEqual(employee);
      expect(client.release).toHaveBeenCalled(); // Ensure release is called
    });
  });

  describe('getAllEmployees', () => {
    it('should return all employees', async () => {
      const mockEmployees = [
        { id: 1, name: 'John Doe', empid: '123', department: 'HR' },
        { id: 2, name: 'Jane Doe', empid: '124', department: 'IT' },
      ];
      const mockResult = { rows: mockEmployees };
      client.query.mockResolvedValue(mockResult);

      const result = await employeeService.getAllEmployees();

      expect(client.query).toHaveBeenCalledWith('SELECT * FROM employee');
      expect(result).toEqual(mockEmployees);
      expect(client.release).toHaveBeenCalled();
    });
  });

  describe('getEmployeeById', () => {
    it('should return an employee by ID', async () => {
      const mockEmployee = { id: 1, name: 'John Doe', empid: '123', department: 'HR' };
      const mockResult = { rows: [mockEmployee] };
      client.query.mockResolvedValue(mockResult);

      const result = await employeeService.getEmployeeById(1);

      expect(client.query).toHaveBeenCalledWith('SELECT * FROM employee WHERE id=$1', [1]);
      expect(result).toEqual(mockEmployee);
      expect(client.release).toHaveBeenCalled();
    });
  });

  describe('updateEmployee', () => {
    it('should update an employee and return the updated data', async () => {
      const employee = { name: 'John Doe', empid: '123', department: 'HR' };
      const updatedEmployee = { id: 1, ...employee };
      const mockResult = { rows: [updatedEmployee] };
      client.query.mockResolvedValue(mockResult);

      const result = await employeeService.updateEmployee(1, employee);

      expect(client.query).toHaveBeenCalledWith(
        'UPDATE employee SET name=$1, empid=$2, department=$3 WHERE id=$4 RETURNING *',
        [employee.name, employee.empid, employee.department, 1]
      );
      expect(result).toEqual(updatedEmployee);
      expect(client.release).toHaveBeenCalled();
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee and return the deleted data', async () => {
      const mockEmployee = { id: 1, name: 'John Doe', empid: '123', department: 'HR' };
      const mockResult = { rows: [mockEmployee] };
      client.query.mockResolvedValue(mockResult);

      const result = await employeeService.deleteEmployee(1);

      expect(client.query).toHaveBeenCalledWith('DELETE FROM employee WHERE id=$1 RETURNING *', [1]);
      expect(result).toEqual(mockEmployee);
      expect(client.release).toHaveBeenCalled();
    });
  });
});
