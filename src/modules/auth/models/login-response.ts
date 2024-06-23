import { User } from 'src/modules/user/entities/user.entity';

export interface LoginResponse {
  access_token: string;
  user: Omit<User, 'password'>;
}
