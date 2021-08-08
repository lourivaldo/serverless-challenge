import { Employee } from '../../entities/Employee';
import { IEmployeesFilter } from '../IEmployeesFilter';
import { IEmployeesRepository } from '../IEmployeesRepository';

export class MockEmployeesRepository implements IEmployeesRepository {
  constructor(private employees: Employee[] = []) {}

  async find(id: string): Promise<Employee | null> {
    const employee = this.employees.find((e) => e.id === id);
    if (employee) return employee;
    return null;
  }

  async findAll(employeesFilter: IEmployeesFilter): Promise<Employee[]> {
    if (employeesFilter.name) {
      return this.employees.filter((e) => e.name === employeesFilter.name);
    }
    return this.employees;
  }

  async save(employee: Employee): Promise<void> {
    this.employees.push(employee);
  }

  async delete(id: string): Promise<void> {
    const employeeIndex = this.employees.findIndex((e) => e.id === id);
    this.employees.splice(employeeIndex, 1);
  }
}
