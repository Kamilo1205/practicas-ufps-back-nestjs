import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  @Roles(Rol.Empresa)
  create(@Body() createTutorDto: CreateTutorDto, @GetUser() usuario: Usuario) {
    return this.tutoresService.create(usuario.empresa.id, createTutorDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.tutoresService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id') id: string) {
    return this.tutoresService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutoresService.update(id, updateTutorDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id') id: string) {
    return this.tutoresService.remove(id);
  }
}
