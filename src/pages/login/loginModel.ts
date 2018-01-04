import { ILogin } from './iLogin';

export class LoginModel implements ILogin {
  constructor() {}

  email: string;
  password: string;
}