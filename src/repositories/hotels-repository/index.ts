import { prisma } from '@/config';

function findPayedOnesByUser(userId: number) {
  return prisma.hotel.findMany({
    where: {
      Rooms: {
        some: {
          Booking: {
            some: {
              User: {
                id: userId,
                Enrollment: {
                  some: {
                    Ticket: {
                      some: {
                        status: 'PAID',
                        TicketType: {
                          includesHotel: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

function findWithRooms(id: number) {
  return prisma.hotel.findUnique({
    where: { id },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findPayedOnesByUser,
  findWithRooms,
};

export default hotelsRepository;
