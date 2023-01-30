import { getTicketsTypes, getUserTicket, postTicket } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getTicketsTypes).get('/', getUserTicket).post('/', postTicket);

export { ticketsRouter };
