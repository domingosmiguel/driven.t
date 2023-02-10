import faker from '@faker-js/faker';
import { PrismaClient, TicketStatus, TicketType } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
    console.log({ event });
  }

  let ticketType = await prisma.ticketType.findFirst();
  let types: TicketType[] = [];
  if (!ticketType) {
    types[0] = await prisma.ticketType.create({
      data: {
        name: 'Remoto',
        price: 20,
        isRemote: true,
        includesHotel: false,
      },
    });
    types[1] = await prisma.ticketType.create({
      data: {
        name: 'NoHotel',
        price: 100,
        isRemote: false,
        includesHotel: false,
      },
    });
    types[2] = await prisma.ticketType.create({
      data: {
        name: 'W/Hotel',
        price: 400,
        isRemote: false,
        includesHotel: true,
      },
    });
    console.log({ types });
  }

  let ticket = await prisma.ticket.findFirst();
  if (!ticket) {
    await prisma.ticket.create({
      data: {
        enrollmentId: 1,
        ticketTypeId: 3,
        status: TicketStatus.PAID,
      },
    });
    console.log({ ticket });
  }

  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    hotel = await prisma.hotel.create({
      data: {
        name: faker.lorem.words(2),
        image: faker.image.abstract(),
      },
    });
    const room = await prisma.room.create({
      data: {
        name: faker.lorem.word(),
        capacity: parseInt(faker.random.numeric()),
        hotelId: hotel.id,
      },
    });

    let user = await prisma.user.findFirst();
    if (user) {
      const booking = await prisma.booking.create({
        data: {
          userId: user.id,
          roomId: room.id,
        },
      });
      console.log({ hotel, room, booking });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
