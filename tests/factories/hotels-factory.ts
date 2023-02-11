import { prisma } from '@/config';
import faker from '@faker-js/faker';

//Sabe criar objetos - Hotel do banco
export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.random.numeric(4),
      capacity: faker.datatype.number({ min: 1, max: 5 }),
      hotelId: hotelId,
    },
  });
}
