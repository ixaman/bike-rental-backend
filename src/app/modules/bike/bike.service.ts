import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const handleCreateBike = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

export const BikeService = {
  handleCreateBike,
};
