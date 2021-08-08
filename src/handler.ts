import express, { json } from 'express';
import helmet from 'helmet';
import serverless from 'serverless-http';

import {
  handleHttpErrors,
  handleErrors,
  handleValidationErrors,
} from './exceptions/handler';
import { router } from './routes';

const app = express();
app.use(json());
app.use(helmet());
app.use(router);
app.use(handleHttpErrors);
app.use(handleValidationErrors);
app.use(handleErrors);

export const handler = serverless(app);
