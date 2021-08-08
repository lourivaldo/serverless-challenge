import { Router } from 'express';

import { createEmployeeController } from './useCases/CreateEmployee';
import { findAllEmployeeController } from './useCases/FindAllEmployee';
import { findEmployeeController } from './useCases/FindEmployee';
import { IController } from './useCases/IController';
import { removeEmployeeController } from './useCases/RemoveEmployee';

const router = Router();

function handler(controller: IController) {
  // @ts-ignore
  return async (request, response, next) => {
    try {
      await controller.handle(request, response);
    } catch (err) {
      next(err);
    }
  };
}

router.post('/employee', handler(createEmployeeController));
router.get('/employee/:employeeId', handler(findEmployeeController));
router.get('/employee', handler(findAllEmployeeController));
router.delete('/employee/:employeeId', handler(removeEmployeeController));

router.use((_, res, __) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

export { router };
