import { ApplicationError } from '@/protocols';

export function NoTicketId(): ApplicationError {
  return {
    name: 'NoTicketId',
    message: 'Must provide ticket type id',
  };
}
