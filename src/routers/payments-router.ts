import { getPayments, postPaymentsProcess } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPayments).post('/process', postPaymentsProcess);

export { paymentsRouter };
