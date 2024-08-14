/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';
import { USER_ROLE } from './user.constants';

export type TUserRole = keyof typeof USER_ROLE;

export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TUserRole;
}

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
