import { $Enums } from '@prisma/client';

export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  role: $Enums.Role;
}
