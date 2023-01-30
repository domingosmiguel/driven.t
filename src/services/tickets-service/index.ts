import { NoTicket, NoTicketTypeId } from '@/errors';
import { NewTicketEntity } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { UserNotEnrolled } from './error';

const allTicketsTypes = async () => {
  return await ticketsRepository.findTypes();
};

const userTicket = async (userId: number) => {
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw UserNotEnrolled();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw NoTicket('This user has no ticket');

  return ticket;
};

const newTicket = async (userId: number, ticketTypeId: number) => {
  if (!ticketTypeId) throw NoTicketTypeId();
  const enrollment = await enrollmentRepository.findByUserId(userId);
  if (!enrollment) throw UserNotEnrolled();

  const newTicket: NewTicketEntity = {
    ticketTypeId,
    enrollmentId: enrollment.id,
  };
  return await ticketsRepository.insert(newTicket);
};

const ticketsService = {
  allTicketsTypes,
  userTicket,
  newTicket,
};

export default ticketsService;
