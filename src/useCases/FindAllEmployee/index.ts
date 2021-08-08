import { DynamodbEmployeesRepository } from '../../repositories/implementations/DynamodbEmployeesRepository';
import { FindAllAllEmployeeController } from './FindAllEmployeeController';
import { FindAllEmployeeUseCase } from './FindAllEmployeeUseCase';

const dynamodbEmployeesRepository = new DynamodbEmployeesRepository();

const findAllEmployeeUseCase = new FindAllEmployeeUseCase(
  dynamodbEmployeesRepository,
);

const findAllEmployeeController = new FindAllAllEmployeeController(
  findAllEmployeeUseCase,
);

export { findAllEmployeeController };
