import { ApplicationError } from '@/protocols';

export function NoTicketTypeId(): ApplicationError {
  return {
    name: 'NoTicketTypeId',
    message: 'Must provide ticket type id',
  };
}
