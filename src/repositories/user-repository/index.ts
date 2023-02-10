import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function verifyTheRightToBook(userId: number) {
  return prisma.user.count({
    where: {
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
  });
}

const userRepository = {
  findByEmail,
  create,
  verifyTheRightToBook,
};

export default userRepository;
