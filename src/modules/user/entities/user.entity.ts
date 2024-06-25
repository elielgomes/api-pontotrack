import { $Enums } from '@prisma/client';

export class User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: $Enums.Role;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
