import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.lorem.words(2),
      image: faker.image.abstract(),
    },
  });
}
