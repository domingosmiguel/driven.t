import { getHotelRooms, getPayedHotels } from '@/controllers/hotels-controller';
import { authenticateToken, validateDatabaseWithUser } from '@/middlewares';
import { Router } from 'express';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken, validateDatabaseWithUser)
  .get('/', getPayedHotels)
  .get('/:hotelId', getHotelRooms);

export { hotelsRouter };
