import { Request } from 'express';
import { User, Roles } from 'src/modules/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: User & {
    id: string;
    password: undefined;
    role: Roles;
  };
}
