/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: 'admin' | 'user';
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
}
