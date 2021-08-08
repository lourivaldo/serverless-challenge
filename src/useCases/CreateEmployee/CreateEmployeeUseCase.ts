import { validateOrReject } from 'class-validator';

import { Employee } from '../../entities/Employee';
import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { ICreateEmployeeRequestDTO } from './CreateEmployeeDTO';

export class CreateEmployeeUseCase {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async execute(data: ICreateEmployeeRequestDTO) {
    const employee = new Employee(data);
    await validateOrReject(employee);
    await this.employeesRepository.save(employee);
  }
}
