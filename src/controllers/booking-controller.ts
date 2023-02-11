import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const bookingWithRoom = await bookingService.getBookingByUser(userId);

  if (!bookingWithRoom) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
  return res.status(httpStatus.OK).send(bookingWithRoom);
}

export async function postAndEditBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingId = parseInt(req.params.bookingId as string);
  const { roomId } = req.body as Record<string, number>;

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const newBookingId = await bookingService.editOrCreateBooking({
      id: bookingId,
      userId,
      roomId,
    });

    return res.status(httpStatus.OK).send({ id: newBookingId });
  } catch (error) {
    if (error.name === 'InvalidRoomId') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'RoomNotAvailable' || error.name === 'BookingRulesViolated') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
}
