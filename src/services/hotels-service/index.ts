import hotelsRepository from '@/repositories/hotels-repository';

async function findPayedHotels(userId: number) {
  return await hotelsRepository.findPayedOnesByUser(userId);
}

async function findHotelRooms(hotelId: number) {
  return await hotelsRepository.findWithRooms(hotelId);
}

const hotelsService = {
  findPayedHotels,
  findHotelRooms,
};

export default hotelsService;
