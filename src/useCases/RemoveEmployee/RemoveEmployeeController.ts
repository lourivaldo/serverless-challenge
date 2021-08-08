import { Request, Response } from 'express';

import { IController } from '../IController';
import { RemoveEmployeeUseCase } from './RemoveEmployeeUseCase';

export class RemoveEmployeeController implements IController {
  constructor(private removeEmployeeUseCase: RemoveEmployeeUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { employeeId: id } = request.params;
    const employee = await this.removeEmployeeUseCase.execute({ id: id! });
    return response.json(employee);
  }
}
