import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { IFindAllEmployeeRequestDTO } from './FindAllEmployeeDTO';

export class FindAllEmployeeUseCase {
  constructor(private employeesRepository: IEmployeesRepository) {}

  async execute(data: IFindAllEmployeeRequestDTO) {
    return this.employeesRepository.findAll(data);
  }
}
