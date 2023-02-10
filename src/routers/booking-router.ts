import { editBooking, getUserBooking, postBooking } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getUserBooking).post('/', postBooking).put('/', editBooking);

export { bookingRouter };
