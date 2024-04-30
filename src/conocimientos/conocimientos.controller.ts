import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConocimientosService } from './conocimientos.service';
import { CreateConocimientoDto, UpdateConocimientoDto } from './dto';
import { UuidDto } from 'src/common/dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';

@Controller('conocimientos')
export class ConocimientosController {
  constructor(private readonly conocimientosService: ConocimientosService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-conocimiento')
  create(@Body() createConocimientoDto: CreateConocimientoDto) {
    return this.conocimientosService.create(createConocimientoDto);
  }

  @Get()
  findAll() {
    return this.conocimientosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('obtener-conocimiento')
  findOne(@Param() { id }: UuidDto) {
    return this.conocimientosService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('actualizar-conocimiento')
  update(@Param() { id }: UuidDto, @Body() updateConocimientoDto: UpdateConocimientoDto) {
    return this.conocimientosService.update(+id, updateConocimientoDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('remove-conocimiento')
  remove(@Param() { id }: UuidDto) {
    return this.conocimientosService.remove(+id);
  }
}
