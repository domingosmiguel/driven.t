import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getUserBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const bookingWithRoom = await bookingService.getBookingByUser(userId);

    if (!bookingWithRoom) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.status(httpStatus.OK).send(bookingWithRoom);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const roomId = parseInt(req.body.roomId as string);

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const bookingId = await bookingService.editOrCreateBooking({ userId, roomId });
    return res.status(httpStatus.OK).send(bookingId);
  } catch (error) {
    if (error.name === 'InvalidRoomId') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'RoomNotAvailable' || error.name === 'BookingRulesViolated') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
  const bookingId = parseInt(req.query.bookingId as string);
  const roomId = parseInt(req.body.roomId as string);

  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    const newBookingId = await bookingService.editOrCreateBooking({
      id: bookingId,
      roomId: roomId,
    });

    return res.status(httpStatus.OK).send(newBookingId);
  } catch (error) {
    if (error.name === 'InvalidRoomId') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'RoomNotAvailable' || error.name === 'BookingRulesViolated') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
