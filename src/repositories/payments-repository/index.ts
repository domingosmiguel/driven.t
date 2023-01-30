import { prisma } from '@/config';
import { newPaymentEntity } from '@/protocols';

async function findByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(payment: newPaymentEntity) {
  return prisma.payment.create({
    data: payment,
  });
}

const paymentsRepository = {
  findByTicketId,
  createPayment,
};

export default paymentsRepository;
