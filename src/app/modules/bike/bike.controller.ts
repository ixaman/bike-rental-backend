import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { BikeService } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeService.handleCreateBike(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    data: result,
  });
});

export const BikeController = {
  createBike,
};
