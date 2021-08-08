import { DynamodbEmployeesRepository } from '../../repositories/implementations/DynamodbEmployeesRepository';
import { RemoveEmployeeController } from './RemoveEmployeeController';
import { RemoveEmployeeUseCase } from './RemoveEmployeeUseCase';

const dynamodbEmployeesRepository = new DynamodbEmployeesRepository();

const removeEmployeeUseCase = new RemoveEmployeeUseCase(
  dynamodbEmployeesRepository,
);

const removeEmployeeController = new RemoveEmployeeController(
  removeEmployeeUseCase,
);

export { removeEmployeeController };
