import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTipoAfiliacionEpsDto, UpdateTipoAfiliacionEpsDto } from './dto';
import { TipoAfiliacionEpsService } from './tipo-afiliacion-eps.service';
import { UuidDto } from 'src/common/dto';
import { Public, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('tipo-afiliacion-eps')
export class TipoAfiliacionEpsController {
  constructor(private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService) {}

  @Post()
  @Roles(Rol.Administrador)
  create(@Body() createTipoAfiliacionEpsDto: CreateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.create(createTipoAfiliacionEpsDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.tipoAfiliacionEpsService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.tipoAfiliacionEpsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateTipoAfiliacionEpDto: UpdateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.update(id, updateTipoAfiliacionEpDto);
  }

  @Delete(':id')
  @Roles(Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.tipoAfiliacionEpsService.remove(id);
  }
}
