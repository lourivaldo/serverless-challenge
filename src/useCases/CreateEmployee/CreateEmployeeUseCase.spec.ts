import { Employee } from '../../entities/Employee';
import { RoleEnum } from '../../enums/RoleEnum';
import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { MockEmployeesRepository } from '../../repositories/implementations/MockEmployeesRepository';
import { ICreateEmployeeRequestDTO } from './CreateEmployeeDTO';
import { CreateEmployeeUseCase } from './CreateEmployeeUseCase';

describe('(Employee) / Create One', () => {
  let createEmployeeUseCase: CreateEmployeeUseCase;
  let employeesRepository: IEmployeesRepository;
  const employees: Employee[] = [
    { id: '1', name: 'Fulano', age: 19, role: RoleEnum.TESTER },
    { id: '2', name: 'Lourivaldo', age: 25, role: RoleEnum.DEVELOPER },
    { id: '3', name: 'Flavio', age: 20, role: RoleEnum.MANAGER },
  ];

  beforeAll(() => {
    employeesRepository = new MockEmployeesRepository(employees);
    createEmployeeUseCase = new CreateEmployeeUseCase(employeesRepository);
  });

  test('Should create employee', async () => {
    const requestDTO: ICreateEmployeeRequestDTO = {
      name: 'Rafael',
      age: 30,
      role: RoleEnum.DEVELOPER,
    };
    const employee = await createEmployeeUseCase.execute(requestDTO);
    expect(employee).toBeUndefined();
  });

  test('Should not create employee', async () => {
    // @ts-ignore
    const requestDTO: ICreateEmployeeRequestDTO = {
      name: 'Jack Ma',
      age: 10000,
    };

    expect.assertions(1);

    try {
      await createEmployeeUseCase.execute(requestDTO);
    } catch (e) {
      expect(e).toBeInstanceOf(Array);
    }
  });
});
