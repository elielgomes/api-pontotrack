import { Controller, Head } from '@nestjs/common';
import { IsPublic } from './modules/auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  @IsPublic()
  @Head('ping')
  ping() {}
}
