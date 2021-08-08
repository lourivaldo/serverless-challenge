import { NotFound } from 'http-errors';

import { Employee } from '../../entities/Employee';
import { RoleEnum } from '../../enums/RoleEnum';
import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { MockEmployeesRepository } from '../../repositories/implementations/MockEmployeesRepository';
import { IFindEmployeeRequestDTO } from './FindEmployeeDTO';
import { FindEmployeeUseCase } from './FindEmployeeUseCase';

describe('(Employee) / Find One', () => {
  let findEmployeeUseCase: FindEmployeeUseCase;
  let employeesRepository: IEmployeesRepository;
  const employees: Employee[] = [
    { id: '1', name: 'Fulano', age: 19, role: RoleEnum.TESTER },
    { id: '2', name: 'Lourivaldo', age: 25, role: RoleEnum.DEVELOPER },
    { id: '3', name: 'Flavio', age: 20, role: RoleEnum.MANAGER },
  ];

  beforeAll(() => {
    employeesRepository = new MockEmployeesRepository(employees);
    findEmployeeUseCase = new FindEmployeeUseCase(employeesRepository);
  });

  test('Should find one employee', async () => {
    const requestDTO: IFindEmployeeRequestDTO = { id: '1' };
    const employeeFound = await findEmployeeUseCase.execute(requestDTO);
    expect(employeeFound).toBe(employees[0]);
  });

  test('Should not find one employee', async () => {
    const requestDTO: IFindEmployeeRequestDTO = { id: '4' };
    await expect(findEmployeeUseCase.execute(requestDTO)).rejects.toThrow(
      NotFound,
    );
  });
});
