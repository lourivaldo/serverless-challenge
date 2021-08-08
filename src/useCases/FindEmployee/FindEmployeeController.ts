import { Request, Response } from 'express';

import { IController } from '../IController';
import { FindEmployeeUseCase } from './FindEmployeeUseCase';

export class FindEmployeeController implements IController {
  constructor(private findEmployeeUseCase: FindEmployeeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeId } = request.params;
    const employee = await this.findEmployeeUseCase.execute({
      id: employeeId!,
    });
    return response.json(employee);
  }
}
