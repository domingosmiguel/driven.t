import { Enrollment, Ticket, TicketType } from '.prisma/client';
import { prisma } from '@/config';
import { notFoundError } from '@/errors';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from './authentication-middleware';

export async function validateDatabaseWithUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const hotelsCount = await prisma.hotel.count();

    if (hotelsCount === 0) return generateNotFoundAnswer(res);

    const userEnrollment: Enrollment | null = await prisma.enrollment.findFirst({
      where: { userId },
    });

    if (userEnrollment === null) {
      return generateNotFoundAnswer(res);
    }

    const userTicket: (Ticket & { TicketType: TicketType }) | null = await prisma.ticket.findFirst({
      where: {
        enrollmentId: userEnrollment.id,
      },
      include: {
        TicketType: true,
      },
    });

    if (userTicket === null) {
      return generateNotFoundAnswer(res);
    } else if (userTicket.TicketType.includesHotel === false || userTicket.status !== 'PAID') {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return next();
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

function generateNotFoundAnswer(res: Response) {
  return res.status(httpStatus.NOT_FOUND).send(notFoundError());
}
