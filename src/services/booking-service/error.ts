import { ApplicationError } from '@/protocols';

export function InvalidRoomId(): ApplicationError {
  return {
    name: 'InvalidRoomId',
    message: 'This room does not exist',
  };
}

export function RoomNotAvailable(): ApplicationError {
  return {
    name: 'RoomNotAvailable',
    message: 'This room has no vacancy',
  };
}

export function BookingRulesViolated(): ApplicationError {
  return {
    name: 'BookingRulesViolated',
    message: 'User can not book room',
  };
}

export function NoReservation(): ApplicationError {
  return {
    name: 'NoReservation',
    message: 'User does not have a reservation',
  };
}
