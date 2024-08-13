import { Application, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());

//default routee
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to Assignment-03 : Bike Rental Service API',
  });
});

//global error handler
app.use(globalErrorHandler);

export default app;
