import { getUserBooking, postAndEditBooking } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getUserBooking)
  .post('/', postAndEditBooking)
  .put('/:bookingId', postAndEditBooking);

export { bookingRouter };
