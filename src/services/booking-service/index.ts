import bookingRepository, { BookingData } from '@/repositories/booking-repository';
import roomRepository from '@/repositories/room-repository';
import userRepository from '@/repositories/user-repository';
import { exclude } from '@/utils/prisma-utils';
import { BookingRulesViolated, InvalidRoomId, RoomNotAvailable } from './error';

async function getBookingByUser(userId: number) {
  const bookingWithRoom = await bookingRepository.findByUserId(userId);

  return exclude(bookingWithRoom, 'userId', 'roomId', 'createdAt', 'updatedAt');
}

async function editOrCreateBooking({ id, userId, roomId }: BookingData) {
  if (userId) {
    const canBook = await userRepository.verifyTheRightToBook(userId);

    if (!canBook) {
      throw BookingRulesViolated();
    }
  }
  const room = await roomRepository.findById(roomId);
  if (!room) {
    throw InvalidRoomId();
  }

  const roomReservations = await bookingRepository.reservationCountForRoomId(roomId);
  if (room.capacity - roomReservations <= 0) {
    throw RoomNotAvailable();
  }

  const booking = await bookingRepository.upsert({ id, userId, roomId });

  return booking.id;
}

const bookingService = {
  getBookingByUser,
  editOrCreateBooking,
};

export default bookingService;
