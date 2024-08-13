import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExist = async function (email) {
  const existingUser = await User.findOne({ email });

  return existingUser;
};

//document middleware pre before save

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hashSync(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
