import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AreasInteresService } from './areas-interes.service';
import { CreateAreaInteresDto, UpdateAreaInteresDto } from './dto';
import { UuidDto } from '../common/dto';
import { Rol } from 'src/auth/enums';
import { Roles } from 'src/auth/decorators';

@Controller('areas-interes')
export class AreasInteresController {
  constructor(private readonly areasInteresService: AreasInteresService) {}

  @Post()
  @Roles(Rol.Administrador)
  create(@Body() createAreaInteresDto: CreateAreaInteresDto) {
    return this.areasInteresService.create(createAreaInteresDto);
  }

  @Get()
  findAll() {
    return this.areasInteresService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.areasInteresService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateAreaInteresDto: UpdateAreaInteresDto) {
    return this.areasInteresService.update(id, updateAreaInteresDto);
  }

  @Delete(':id')
  @Roles(Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.areasInteresService.remove(id);
  }
}
