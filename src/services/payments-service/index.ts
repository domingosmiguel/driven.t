import { NoTicket, NoTicketId } from '@/errors';
import { newPaymentEntity } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { MissingParams, NotTicketOwner } from './error';

const paymentData = async (userId: number, ticketId: number) => {
  if (!ticketId) throw NoTicketId();

  const ticket = await ticketsRepository.findById(ticketId);
  if (!ticket) throw NoTicket('This ticket does not exist');

  const enrollment = await enrollmentRepository.findByIdAndUserId(ticket.enrollmentId, userId);
  if (!enrollment) throw NotTicketOwner();

  return paymentsRepository.findByTicketId(ticket.id);
};

const newPayment = async (ticketId: number, cardData: cardEntity, userId: number) => {
  if (!ticketId || !cardData) throw MissingParams();

  const ticket = await ticketsRepository.findById(ticketId);
  if (!ticket) throw NoTicket('Ticket not found');

  const enrollment = await enrollmentRepository.findByIdAndUserId(ticket.enrollmentId, userId);
  if (!enrollment) throw NotTicketOwner();

  const { price: value } = await ticketsRepository.findTypeById(ticket.ticketTypeId);

  const paymentData: newPaymentEntity = {
    ticketId,
    value,
    cardIssuer: cardData.issuer,
    cardLastDigits: `${cardData.number}`.slice(-4),
  };
  const payment = await paymentsRepository.createPayment(paymentData);

  await ticketsRepository.update(ticketId);
  return payment;
};

const paymentsService = {
  paymentData,
  newPayment,
};

export type PaymentParams = {
  ticketId: number;
  cardData: cardEntity;
};

export type cardEntity = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export default paymentsService;
