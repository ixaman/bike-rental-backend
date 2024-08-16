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

const handleReturnBike = async (rentalId: string) => {
  const rental = await Rental.findById(rentalId);

  if (!rental) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Rental not found!');
  }

  const { bikeId, startTime } = rental;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const startedTime = new Date(startTime);
    const returnedTime = new Date();

    const diffsInMs: number = returnedTime.getTime() - startedTime.getTime();

    const totalHours: number = Math.round(diffsInMs / (1000 * 60 * 60));

    const totalCost = totalHours * 15;

    //transaction-1 : update the rental
    const updatedRental = await Rental.findByIdAndUpdate(
      rentalId,
      {
        returnTime: returnedTime.toISOString(),
        totalCost,
        isReturned: true,
      },
      {
        new: true,
        session,
      },
    );

    if (!updatedRental) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to return bike');
    }

    //transaction-2: update the bike
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: true },
      {
        new: true,
        session,
      },
    );

    if (!updatedBike) {
      throw new CustomError(httpStatus.BAD_REQUEST, 'Failed to update bike');
    }

    await session.commitTransaction();
    await session.endSession();

    return updatedRental;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const handleGetMyRentals = async (token: JwtPayload) => {
  const user = await User.isUserExist(token.userEmail);

  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const rentals = await Rental.find({ userId: user._id });

  if (!rentals) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'No rentals found for the user!',
    );
  }

  return rentals;
};

export const RentalService = {
  handleCreateRental,
  handleReturnBike,
  handleGetMyRentals,
};
