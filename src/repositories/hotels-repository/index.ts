import { prisma } from '@/config';

// function findPayedOnes(userId) {
//   return prisma.ticket.findMany({
//     where: {
//       TicketType: {
//         includesHotel: true,
//       },
//       status: 'PAID',
//       Enrollment: {
//         userId,
//       },
//     },
//     select: {
//       Enrollment: {
//         select: {
//           User: {
//             select: {
//               Booking: {
//                 select: {
//                   Room: {
//                     select: {
//                       Hotel: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
// }
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
