import { Employee } from '../../entities/Employee';
import { RoleEnum } from '../../enums/RoleEnum';
import { IEmployeesRepository } from '../../repositories/IEmployeesRepository';
import { MockEmployeesRepository } from '../../repositories/implementations/MockEmployeesRepository';
import { IFindAllEmployeeRequestDTO } from './FindAllEmployeeDTO';
import { FindAllEmployeeUseCase } from './FindAllEmployeeUseCase';

describe('(Employee) / Find All', () => {
  let findAllEmployeeUseCase: FindAllEmployeeUseCase;
  let employeesRepository: IEmployeesRepository;
  const employees: Employee[] = [
    { id: '1', name: 'Fulano', age: 19, role: RoleEnum.TESTER },
    { id: '2', name: 'Lourivaldo', age: 25, role: RoleEnum.DEVELOPER },
    { id: '3', name: 'Flavio', age: 20, role: RoleEnum.MANAGER },
  ];

  beforeAll(() => {
    employeesRepository = new MockEmployeesRepository(employees);
    findAllEmployeeUseCase = new FindAllEmployeeUseCase(employeesRepository);
  });

  test('Should find by employee name', async () => {
    const requestDTO: IFindAllEmployeeRequestDTO = { name: 'Lourivaldo' };
    const foundEmployees = await findAllEmployeeUseCase.execute(requestDTO);
    expect(foundEmployees).toEqual([employees[1]]);
  });

  test('Should not find by employee name', async () => {
    const requestDTO: IFindAllEmployeeRequestDTO = { name: 'Jack Ma' };
    const foundEmployees = await findAllEmployeeUseCase.execute(requestDTO);
    await expect(foundEmployees).toEqual([]);
  });
});
