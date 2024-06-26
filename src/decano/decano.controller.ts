import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DecanoService } from './decano.service';
import { CreateDecanoDto, UpdateDecanoDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('decano')
export class DecanoController {
  constructor(private readonly decanoService: DecanoService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createDecanoDto: CreateDecanoDto) {
    return this.decanoService.create(createDecanoDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne() {
    return this.decanoService.findOne();
  }

  @Get('/all')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.decanoService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOneById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.decanoService.findOneById(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateDecanoDto: UpdateDecanoDto) {
    return this.decanoService.update(id, updateDecanoDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.decanoService.remove(id);
  }
}
