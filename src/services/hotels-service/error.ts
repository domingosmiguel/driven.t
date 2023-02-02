import { ApplicationError } from '@/protocols';

export function MissingHotelId(): ApplicationError {
  return {
    name: 'MissingHotelId',
    message: 'Hotel id is missing',
  };
}
