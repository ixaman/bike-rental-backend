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

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeService.handleGetAllBikes();

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBikeWithId = catchAsync(async (req, res) => {
  const { id: bikeId } = req.params;
  const result = await BikeService.handleUpdateBikeWithId(bikeId, req.body);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBikeWithId = catchAsync(async (req, res) => {
  const { id: bikeId } = req.params;
  const result = await BikeService.handleDeleteBikeWithId(bikeId);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  updateBikeWithId,
  deleteBikeWithId,
};
