import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { Roles } from './auth/decorators/roles.decorator';
import { Rol } from './auth/enums/rol.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Rol.Coordinador)
  @Get('coordinador')
  getHelloCoordinador(): string {
    return this.appService.getHello();
  }

  @Roles(Rol.Estudiante)
  @Get('estudiante')
  getHelloEstudiante(): string {
    return this.appService.getHello();
  }
}
