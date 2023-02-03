import { notFoundError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPayedHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const hotels = await hotelsService.findPayedHotels(userId);

    if (hotels.length === 0) {
      return res.status(httpStatus.NOT_FOUND).send(notFoundError());
    }

    return res.send(hotels);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelRooms(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  try {
    const hotelRooms = await hotelsService.findHotelRooms(parseInt(hotelId));

    if (hotelRooms === null) {
      return res.status(httpStatus.NOT_FOUND).send(notFoundError());
    }

    return res.send(hotelRooms);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
