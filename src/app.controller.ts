import { Controller, Get, Head } from '@nestjs/common';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Get()
  hello() {
    return 'Olá, seja bem-vindo à API da AppTrack!';
  }

  @IsPublic()
  @Head('ping')
  ping() {
    return this.userService.ping();
  }
}
