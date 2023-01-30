import { AuthenticatedRequest } from '@/middlewares';
import paymentsService, { PaymentParams } from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query as Record<string, string>;

  try {
    const payment = await paymentsService.paymentData(userId, parseInt(ticketId, 10));

    res.send(payment);
  } catch (error) {
    if (error.name === 'NoTicketId') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'NoTicket') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'NotTicketOwner') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPaymentsProcess(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body as PaymentParams;
  const { userId } = req;
  try {
    const payment = await paymentsService.newPayment(ticketId, cardData, userId);

    res.send(payment);
  } catch (error) {
    if (error.name === 'MissingParams') {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    if (error.name === 'NoTicket') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'NotTicketOwner') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
