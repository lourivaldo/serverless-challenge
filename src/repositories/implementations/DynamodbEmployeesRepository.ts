// eslint-disable-next-line import/no-extraneous-dependencies
import { DynamoDB } from 'aws-sdk';

import { Employee } from '../../entities/Employee';
import { IEmployeesFilter } from '../IEmployeesFilter';
import { IEmployeesRepository } from '../IEmployeesRepository';

const { EMPLOYEES_TABLE, IS_OFFLINE, DYNAMODB_ENDPOINT, DYNAMODB_REGION } =
  process.env;

const dynamoDbClientParams = IS_OFFLINE
  ? { region: DYNAMODB_REGION, endpoint: DYNAMODB_ENDPOINT }
  : {};

export class DynamodbEmployeesRepository implements IEmployeesRepository {
  private client: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB.DocumentClient(dynamoDbClientParams);
  }

  async find(id: string): Promise<Employee | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: EMPLOYEES_TABLE!,
      Key: {
        employeeId: id,
      },
    };

    const { Item } = await this.client.get(params).promise();
    if (Item) {
      const { employeeId, employeeName, age, role } = Item;
      return { id: employeeId, name: employeeName, age, role };
    }

    return null;
  }

  async findAll(employeesFilter: IEmployeesFilter): Promise<Employee[]> {
    const params = {
      TableName: EMPLOYEES_TABLE!,
      IndexName: 'EmployeesNameIndex',
      KeyConditionExpression: '#employeeName = :employeeNameVal',
      ExpressionAttributeNames: {
        '#employeeName': 'employeeName',
      },
      ExpressionAttributeValues: {
        ':employeeNameVal': employeesFilter.name,
      },
    };

    const { Items } = await this.client.query(params).promise();

    if (Items) {
      return Items.map((Item) => {
        const { employeeId, employeeName, age, role } = Item;
        return { id: employeeId, name: employeeName, age, role };
      });
    }

    return [];
  }

  async save(employee: Employee): Promise<void> {
    const params = {
      TableName: EMPLOYEES_TABLE!,
      Item: {
        employeeId: employee.id,
        employeeName: employee.name,
        age: employee.age,
        role: employee.role,
      },
    };

    await this.client.put(params).promise();
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: EMPLOYEES_TABLE!,
      Key: {
        employeeId: id,
      },
    };

    await this.client.delete(params).promise();
  }
}
