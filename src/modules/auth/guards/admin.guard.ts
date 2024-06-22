import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.id) {
      throw new UnauthorizedException(
        "You don't have permission to access this resource.",
      );
    }
    const recoveredUser = await this.userRepository.findById(user.id);
    if (!recoveredUser || recoveredUser.role !== $Enums.Role.ADMIN) {
      throw new UnauthorizedException(
        "You don't have permission to access this resource.",
      );
    }

    return true;
  }
}
