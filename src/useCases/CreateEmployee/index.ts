import { DynamodbEmployeesRepository } from '../../repositories/implementations/DynamodbEmployeesRepository';
import { CreateEmployeeController } from './CreateEmployeeController';
import { CreateEmployeeUseCase } from './CreateEmployeeUseCase';

const dynamodbEmployeesRepository = new DynamodbEmployeesRepository();

const createEmployeeUseCase = new CreateEmployeeUseCase(
  dynamodbEmployeesRepository,
);

const createEmployeeController = new CreateEmployeeController(
  createEmployeeUseCase,
);

export { createEmployeeController };
