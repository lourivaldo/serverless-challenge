import { Request, Response } from 'express';

import { IController } from '../IController';
import { CreateEmployeeUseCase } from './CreateEmployeeUseCase';

export class CreateEmployeeController implements IController {
  constructor(private createEmployeeUseCase: CreateEmployeeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, age, role } = request.body;
    await this.createEmployeeUseCase.execute({ name, age, role });
    return response.status(201).send();
  }
}
