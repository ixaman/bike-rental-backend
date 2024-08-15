import httpStatus from 'http-status';
import CustomError from '../../errors/CustomError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const handleCreateBike = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

const handleGetAllBikes = async () => {
  const result = await Bike.find();

  return result;
};

const handleUpdateBikeWithId = async (id: string, payload: Partial<TBike>) => {
  //checking if bike exist
  const bike = await Bike.isBikeExist(id);
  console.log(bike);

  if (!bike) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  const result = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const handleDeleteBikeWithId = async (id: string) => {
  //checking if bike exist
  const bike = await Bike.isBikeExist(id);

  if (!bike) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  const result = await Bike.findByIdAndDelete(id);

  return result;
};

export const BikeService = {
  handleCreateBike,
  handleGetAllBikes,
  handleUpdateBikeWithId,
  handleDeleteBikeWithId,
};
