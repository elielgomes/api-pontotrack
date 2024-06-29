import { Request } from 'express';
import { User } from 'src/modules/user/entities/user.entity';
import { Role } from 'src/modules/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: User & {
    id: string;
    password: undefined;
    role: Role;
  };
}
