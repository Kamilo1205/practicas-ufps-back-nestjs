import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemestreService } from './semestre.service';
import { CreateSemestreDto, UpdateSemestreDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('semestre')
export class SemestreController {
  constructor(private readonly semestreService: SemestreService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createSemestreDto: CreateSemestreDto) {
    return this.semestreService.create(createSemestreDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.semestreService.findAll();
  }

  @Get('actual')
  findSemestreActual() {
    return this.semestreService.getSemestreActual();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id') id: string) {
    return this.semestreService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id') id: string, @Body() updateSemestreDto: UpdateSemestreDto) {
    return this.semestreService.update(id, updateSemestreDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id') id: string) {
    return this.semestreService.remove(id);
  }
}
