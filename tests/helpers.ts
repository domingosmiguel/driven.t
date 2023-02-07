import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

import { prisma } from '@/config';
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';

export async function cleanDb() {
  await prisma.event.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.ticketType.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token, incomingUser);

  return token;
}
