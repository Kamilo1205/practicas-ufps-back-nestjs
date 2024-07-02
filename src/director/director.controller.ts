import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateDirectorDto, UpdateDirectorDto } from './dto';
import { DirectorService } from './director.service';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @Roles(Rol.Administrador, Rol.Coordinador)
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(id, updateDirectorDto);
  }

  @Delete(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  remove(@Param('id') id: string) {
    return this.directorService.remove(id);
  }

  @Patch(':id/restore')
  @Roles(Rol.Administrador, Rol.Coordinador)
  restore(@Param('id') id: string) {
    return this.directorService.restore(id);
  }
}
