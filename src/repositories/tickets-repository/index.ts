import { prisma } from '@/config';
import { NewTicketEntity } from '@/protocols';
import { TicketStatus } from '@prisma/client';

async function findTypes() {
  return prisma.ticketType.findMany();
}

async function findTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: { id },
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: { TicketType: true },
  });
}

async function findById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
  });
}

async function insert(ticketData: NewTicketEntity) {
  return prisma.ticket.create({
    data: {
      ticketTypeId: ticketData.ticketTypeId,
      enrollmentId: ticketData.enrollmentId,
      status: TicketStatus.RESERVED,
    },
    include: { TicketType: true },
  });
}

async function update(id: number) {
  return prisma.ticket.update({
    where: { id },
    data: { status: TicketStatus.PAID },
  });
}

const ticketsRepository = {
  findTypes,
  findTypeById,
  findTicketByEnrollmentId,
  findById,
  insert,
  update,
};

export default ticketsRepository;
