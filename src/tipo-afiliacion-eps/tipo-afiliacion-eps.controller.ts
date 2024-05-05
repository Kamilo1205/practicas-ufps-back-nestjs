import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTipoAfiliacionEpsDto, UpdateTipoAfiliacionEpsDto } from './dto';
import { TipoAfiliacionEpsService } from './tipo-afiliacion-eps.service';
import { UuidDto } from 'src/common/dto';
import { Permisos, Public, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('tipo-afiliacion-eps')
export class TipoAfiliacionEpsController {
  constructor(private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-tipo-afiliacion-eps')
  create(@Body() createTipoAfiliacionEpsDto: CreateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.create(createTipoAfiliacionEpsDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.tipoAfiliacionEpsService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-tipo-afiliacion-eps')
  findOne(@Param() { id }: UuidDto) {
    return this.tipoAfiliacionEpsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-tipo-afiliacion-eps')
  update(@Param() { id }: UuidDto, @Body() updateTipoAfiliacionEpDto: UpdateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.update(id, updateTipoAfiliacionEpDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remover-tipo-afiliacion-eps')
  remove(@Param() { id }: UuidDto) {
    return this.tipoAfiliacionEpsService.remove(id);
  }
}
