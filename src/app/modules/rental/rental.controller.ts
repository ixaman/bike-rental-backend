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

export const RentalController = {
  createRental,
};
