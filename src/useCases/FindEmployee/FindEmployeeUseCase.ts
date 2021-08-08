import { NotFound } from 'http-errors';

import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { IFindEmployeeRequestDTO } from './FindEmployeeDTO';

export class FindEmployeeUseCase {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async execute(data: IFindEmployeeRequestDTO) {
    const employee = await this.employeesRepository.find(data.id);
    if (!employee) throw new NotFound('Employee not found');
    return employee;
  }
}
