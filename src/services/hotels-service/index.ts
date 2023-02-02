import hotelsRepository from '@/repositories/hotels-repository';
import { MissingHotelId } from './error';

async function findPayedHotels(userId: number) {
  return await hotelsRepository.findPayedOnesByUser(userId);
}

async function findHotelRooms(hotelId: number) {
  if (!hotelId) throw MissingHotelId();

  return await hotelsRepository.findWithRooms(hotelId);
}

const hotelsService = {
  findPayedHotels,
  findHotelRooms,
};

export default hotelsService;
