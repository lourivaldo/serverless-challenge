import { ErrorRequestHandler } from 'express';
import { HttpError } from 'http-errors';

export const handleHttpErrors: ErrorRequestHandler = (
  err,
  _,
  response,
  next,
) => {
  if (err instanceof HttpError) {
    const { statusCode, message } = err;
    return response.status(statusCode).json({ message });
  }
  return next(err);
};

export const handleValidationErrors: ErrorRequestHandler = (
  err,
  _,
  response,
  next,
) => {
  if (err instanceof Array) {
    const errors = err
      .map<string[]>((e) => Object.values(e.constraints))
      .reduce<string[]>((a, b) => a.concat(b), []);
    return response.status(422).json({ message: 'Validation error', errors });
  }
  return next(err);
};

export const handleErrors: ErrorRequestHandler = (err, _, response, _2) => {
  return response.status(400).json({
    message: err.message || 'Unexpected error',
  });
};
