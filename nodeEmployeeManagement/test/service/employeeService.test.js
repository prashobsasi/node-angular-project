const employeeService = require('../../service/employeeService');
const employeeRepository = require('../../repository/employeeRepository');

jest.mock('../../repository/employeeRepository');

describe('Employee Service', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new employee', async () => {
    const employee = { name: 'John Doe', position: 'Developer' };
    employeeRepository.createEmployee.mockResolvedValue(employee);

    const result = await employeeService.createEmployee(employee);

    expect(result).toEqual(employee);
    expect(employeeRepository.createEmployee).toHaveBeenCalledWith(employee);
  });

  it('should return all employees', async () => {
    const employees = [
      { name: 'John Doe', position: 'Developer' },
      { name: 'Jane Doe', position: 'Manager' },
    ];
    employeeRepository.getAllEmployees.mockResolvedValue(employees);

    const result = await employeeService.getAllEmployees();

    expect(result).toEqual(employees);
    expect(employeeRepository.getAllEmployees).toHaveBeenCalled();
  });

  it('should return an employee by id', async () => {
    const employee = { id: 1, name: 'John Doe', position: 'Developer' };
    employeeRepository.getEmployeeById.mockResolvedValue(employee);

    const result = await employeeService.getEmployeeById(1);

    expect(result).toEqual(employee);
    expect(employeeRepository.getEmployeeById).toHaveBeenCalledWith(1);
  });

  it('should throw an error if employee not found by id', async () => {
    employeeRepository.getEmployeeById.mockResolvedValue(null);

    await expect(employeeService.getEmployeeById(999)).rejects.toThrow('Employee not found');
  });

  it('should update an employee', async () => {
    const updatedEmployee = { id: 1, name: 'John Doe', position: 'Senior Developer' };
    employeeRepository.updateEmployee.mockResolvedValue(updatedEmployee);

    const result = await employeeService.updateEmployee(1, updatedEmployee);

    expect(result).toEqual(updatedEmployee);
    expect(employeeRepository.updateEmployee).toHaveBeenCalledWith(1, updatedEmployee);
  });

  it('should throw an error if employee not found for update', async () => {
    employeeRepository.updateEmployee.mockResolvedValue(null);

    await expect(employeeService.updateEmployee(999, { name: 'Nonexistent' })).rejects.toThrow('Employee not found');
  });

  it('should delete an employee', async () => {
    const employee = { id: 1, name: 'John Doe' };
    employeeRepository.deleteEmployee.mockResolvedValue(employee);

    const result = await employeeService.deleteEmployee(1);

    expect(result).toEqual(employee);
    expect(employeeRepository.deleteEmployee).toHaveBeenCalledWith(1);
  });

  it('should throw an error if employee not found for deletion', async () => {
    employeeRepository.deleteEmployee.mockResolvedValue(null);

    await expect(employeeService.deleteEmployee(999)).rejects.toThrow('Employee not found');
  });
});
