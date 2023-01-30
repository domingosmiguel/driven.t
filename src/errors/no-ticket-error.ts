import { ApplicationError } from '@/protocols';

export function NoTicket(message: string): ApplicationError {
  return {
    name: 'NoTicket',
    message,
  };
}
