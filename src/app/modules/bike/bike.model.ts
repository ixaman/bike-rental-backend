import { model, Schema } from 'mongoose';
import { BikeModel, TBike } from './bike.interface';

const bikeSchema = new Schema<TBike, BikeModel>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    cc: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

bikeSchema.statics.isBikeExist = async function (id: string) {
  const bike = await Bike.findById(id);

  return bike;
};

export const Bike = model<TBike, BikeModel>('Bike', bikeSchema);
