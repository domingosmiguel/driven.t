import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPayedHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.findPayedHotels(userId);

    if (hotels.length === 0) {
      return res.status(httpStatus.NO_CONTENT).send([]);
    }

    return res.send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  try {
    const hotelRooms = await hotelsService.findHotelRooms(parseInt(hotelId));

    if (Object.keys(hotelRooms).length === 0) {
      return res.status(httpStatus.NO_CONTENT).send({});
    }

    return res.send(hotelRooms);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
