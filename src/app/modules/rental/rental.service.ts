import { JwtPayload } from 'jsonwebtoken';
import { TRental } from './rental.interface';
import { Rental } from './rental.model';
import { Bike } from '../bike/bike.model';
import CustomError from '../../errors/CustomError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

const handleCreateRental = async (token: JwtPayload, payload: TRental) => {
  const bikeIdString = payload.bikeId.toString();

  //check if the bike is exists and available
  const bike = await Bike.isBikeExist(bikeIdString);

  if (!bike) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Bike is not found!');
  }
  if (bike.isAvailable === false) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Bike is not available!');
  }

  const user = await User.isUserExist(token.userEmail);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'User not found!');
  }

  payload.userId = user.id;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const rental = await Rental.create([payload], {
      session,
    });

    if (!rental.length) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to create rental');
    }

    const updatedBike = await Bike.findByIdAndUpdate(
      payload.bikeId,
      { isAvailable: false },
      { new: true, session },
    );
    if (!updatedBike) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to update bike');
    }

    await session.commitTransaction();
    await session.endSession();

    return rental[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const RentalService = {
  handleCreateRental,
};
