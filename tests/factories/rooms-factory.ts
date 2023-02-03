import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.lorem.word(),
      capacity: parseInt(faker.random.numeric()),
      hotelId,
    },
  });
}
