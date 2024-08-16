import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { RentalService } from './rental.service';

const createRental = catchAsync(async (req, res) => {
  const result = await RentalService.handleCreateRental(req.user, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rental created successfully',
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { id: rentalId } = req.params;
  const result = await RentalService.handleReturnBike(rentalId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getMyRentals = catchAsync(async (req, res) => {
  const result = await RentalService.handleGetMyRentals(req.user);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

export const RentalController = {
  createRental,
  returnBike,
  getMyRentals,
};
