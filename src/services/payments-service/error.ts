import { ApplicationError } from '@/protocols';

export function NotTicketOwner(): ApplicationError {
  return {
    name: 'NotTicketOwner',
    message: 'The user does not own this ticket',
  };
}

export function MissingParams(): ApplicationError {
  return {
    name: 'MissingParams',
    message: 'Ticket id or card data missing',
  };
}
