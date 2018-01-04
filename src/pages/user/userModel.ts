import { IUser } from './iUser';

export class UserModel implements IUser {
  id: number;
  email: string;
  username: string;
  admin: boolean;
  language: string;
}