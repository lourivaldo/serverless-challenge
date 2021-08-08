import { DynamodbEmployeesRepository } from '../../repositories/implementations/DynamodbEmployeesRepository';
import { FindEmployeeController } from './FindEmployeeController';
import { FindEmployeeUseCase } from './FindEmployeeUseCase';

const dynamodbEmployeesRepository = new DynamodbEmployeesRepository();

const findEmployeeUseCase = new FindEmployeeUseCase(
  dynamodbEmployeesRepository,
);

const findEmployeeController = new FindEmployeeController(findEmployeeUseCase);

export { findEmployeeController };
