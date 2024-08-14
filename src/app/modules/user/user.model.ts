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
      select: 0,
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

//statics method to check if the user is exist
userSchema.statics.isUserExist = async function (email) {
  const existingUser = await User.findOne({ email }).select('+password');

  return existingUser;
};

//Static method to check if the password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

//document pre middleware  before save
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hashSync(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Middleware to hash password before saving or updating
userSchema.pre('findOneAndUpdate', async function (next) {
  // Get the update object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = this.getUpdate() as any;

  // Check if the password is being updated
  if (update.password) {
    update.password = await bcrypt.hashSync(
      update.password,
      Number(config.bcrypt_salt_round),
    );
  }

  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
