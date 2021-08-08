import { Request, Response } from 'express';

import { IController } from '../IController';
import { FindAllEmployeeUseCase } from './FindAllEmployeeUseCase';

export class FindAllAllEmployeeController implements IController {
  constructor(private findAllEmployeeUseCase: FindAllEmployeeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;
    const employees = await this.findAllEmployeeUseCase.execute({
      name: `${name}`,
    });
    return response.json(employees);
  }
}
