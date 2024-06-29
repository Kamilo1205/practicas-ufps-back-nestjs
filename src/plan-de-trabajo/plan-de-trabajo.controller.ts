import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PlanDeTrabajoService } from './plan-de-trabajo.service';
import { CreatePlanDeTrabajoDto, UpdatePlanDeTrabajoDto } from './dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('plan-trabajo')
export class PlanDeTrabajoController {
  constructor(private readonly planDeTrabajoService: PlanDeTrabajoService) {}

  @Post()
  @Roles(Rol.Estudiante)
  create(@GetUser() usuario: Usuario, @Body() createPlanDeTrabajoDto: CreatePlanDeTrabajoDto) {
    return this.planDeTrabajoService.create(usuario, createPlanDeTrabajoDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.planDeTrabajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planDeTrabajoService.findOne(id);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planDeTrabajoService.remove(id);
  }
}
