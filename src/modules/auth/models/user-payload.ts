import { $Enums } from '@prisma/client';

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  role: $Enums.Role;
  iat?: number;
  exp?: number;
}
