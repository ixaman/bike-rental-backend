import { model, Schema } from 'mongoose';
import { TRental } from './rental.interface';

const rentalSchema = new Schema<TRental>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Bike',
  },
  startTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
});

export const Rental = model<TRental>('Rental', rentalSchema);
