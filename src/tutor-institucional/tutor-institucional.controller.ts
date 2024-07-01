import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TutorInstitucionalService } from './tutor-institucional.service';
import { CreateTutorInstitucionalDto, UpdateTutorInstitucionalDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('tutor-institucional')
export class TutorInstitucionalController {
  constructor(private readonly tutorInstitucionalService: TutorInstitucionalService) {}

  @Post()
  @Roles(Rol.Administrador, Rol.Coordinador)
  create(@Body() createTutorInstitucionalDto: CreateTutorInstitucionalDto) {
    return this.tutorInstitucionalService.create(createTutorInstitucionalDto);
  }

  @Get()
  @Roles(Rol.Administrador, Rol.Coordinador)
  findAll() {
    return this.tutorInstitucionalService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tutorInstitucionalService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  restore(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tutorInstitucionalService.restore(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTutorInstitucionalDto: UpdateTutorInstitucionalDto) {
    return this.tutorInstitucionalService.update(id, updateTutorInstitucionalDto);
  }

  @Delete(':id')
  @Roles(Rol.Administrador, Rol.Coordinador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tutorInstitucionalService.remove(id);
  }
}
