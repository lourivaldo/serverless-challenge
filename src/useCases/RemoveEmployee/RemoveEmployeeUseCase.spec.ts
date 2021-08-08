import { NotFound } from 'http-errors';

import { Employee } from '../../entities/Employee';
import { RoleEnum } from '../../enums/RoleEnum';
import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { MockEmployeesRepository } from '../../repositories/implementations/MockEmployeesRepository';
import { IRemoveEmployeeRequestDTO } from './RemoveEmployeeDTO';
import { RemoveEmployeeUseCase } from './RemoveEmployeeUseCase';

describe('(Employee) / Remove', () => {
  let removeEmployeeUseCase: RemoveEmployeeUseCase;
  let employeesRepository: IEmployeesRepository;
  const employees: Employee[] = [
    { id: '1', name: 'Fulano', age: 19, role: RoleEnum.TESTER },
    { id: '2', name: 'Lourivaldo', age: 25, role: RoleEnum.DEVELOPER },
    { id: '3', name: 'Flavio', age: 20, role: RoleEnum.MANAGER },
  ];

  beforeAll(() => {
    employeesRepository = new MockEmployeesRepository(employees);
    removeEmployeeUseCase = new RemoveEmployeeUseCase(employeesRepository);
  });

  test('Should remove employee', async () => {
    const requestDTO: IRemoveEmployeeRequestDTO = { id: '1' };
    await removeEmployeeUseCase.execute(requestDTO);
    expect(await employeesRepository.find('1')).toBeNull();
  });

  test('Should not remove employee', async () => {
    const requestDTO: IRemoveEmployeeRequestDTO = { id: '1' };
    await expect(removeEmployeeUseCase.execute(requestDTO)).rejects.toThrow(
      NotFound,
    );
  });
});
