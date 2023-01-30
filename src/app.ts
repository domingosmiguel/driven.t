import cors from 'cors';
import express, { Express } from 'express';
import 'express-async-errors';
import 'reflect-metadata';

import { connectDb, disconnectDB, loadEnv } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';
import {
  authenticationRouter,
  enrollmentsRouter,
  eventsRouter,
  paymentsRouter,
  ticketsRouter,
  usersRouter,
} from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/tickets', ticketsRouter)
  .use('/payments', paymentsRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;