import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CreateTipoAfiliacionEpsDto, UpdateTipoAfiliacionEpsDto } from './dto';
import { TipoAfiliacionEpsService } from './tipo-afiliacion-eps.service';
import { Public, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('tipo-afiliacion-eps')
export class TipoAfiliacionEpsController {
  constructor(private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createTipoAfiliacionEpsDto: CreateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.create(createTipoAfiliacionEpsDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.tipoAfiliacionEpsService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tipoAfiliacionEpsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTipoAfiliacionEpDto: UpdateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.update(id, updateTipoAfiliacionEpDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tipoAfiliacionEpsService.remove(id);
  }
}
