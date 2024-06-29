export enum RolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type Roles = 'ADMIN' | 'USER';

export class User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: Roles;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
