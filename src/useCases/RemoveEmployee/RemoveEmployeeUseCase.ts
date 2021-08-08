import { NotFound } from 'http-errors';

import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { IRemoveEmployeeRequestDTO } from './RemoveEmployeeDTO';

export class RemoveEmployeeUseCase {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async execute(data: IRemoveEmployeeRequestDTO) {
    const employee = await this.employeesRepository.find(data.id);
    if (!employee) throw new NotFound('Employee not found');
    await this.employeesRepository.delete(data.id);
  }
}
