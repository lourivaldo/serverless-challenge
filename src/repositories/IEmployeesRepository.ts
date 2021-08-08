import { Employee } from '../entities/Employee';
import { IEmployeesFilter } from './IEmployeesFilter';

export interface IEmployeesRepository {
  find(id: string): Promise<Employee | null>;
  findAll(employeesFilter: IEmployeesFilter): Promise<Employee[]>;
  save(employee: Employee): Promise<void>;
  delete(id: string): Promise<void>;
}
