export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  role?: Role;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
