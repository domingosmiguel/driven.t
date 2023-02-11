import { prisma } from '@/config';
import { Booking } from '@prisma/client';

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function reservationCountForRoomId(roomId: number) {
  return prisma.booking.count({
    where: {
      roomId,
    },
  });
}

async function upsert({ id, userId, roomId }: BookingData) {
  return prisma.booking.upsert({
    where: { id: id || 0 },
    create: {
      userId,
      roomId,
    },
    update: {
      roomId,
    },
  });
}

async function findById(id: number) {
  return prisma.booking.findUnique({
    where: {
      id,
    },
  });
}

export type BookingData = Partial<Pick<Booking, 'id'>> & Required<Pick<Booking, 'userId' | 'roomId'>>;

const bookingRepository = { findByUserId, reservationCountForRoomId, upsert, findById };

export default bookingRepository;
