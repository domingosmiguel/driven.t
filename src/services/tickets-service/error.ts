import { ApplicationError } from '@/protocols';

export function UserNotEnrolled(): ApplicationError {
  return {
    name: 'UserNotEnrolled',
    message: 'This user is not enrolled',
  };
}
