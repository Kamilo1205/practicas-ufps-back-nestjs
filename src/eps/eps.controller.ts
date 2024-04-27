import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpsService } from './eps.service';
import { CreateEpsDto, UpdateEpsDto } from './dto';
import { Permisos, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { UuidDto } from 'src/common/dto';

@Controller('eps')
export class EpsController {
  constructor(private readonly epsService: EpsService) {}

  @Post()
  @Roles(Rol.Coordinador)
  @Permisos('crear-eps')
  create(@Body() createEpDto: CreateEpsDto) {
    return this.epsService.create(createEpDto);
  }

  @Get()
  findAll() {
    return this.epsService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador)
  @Permisos('crear-eps')
  findOne(@Param() { id }: UuidDto) {
    return this.epsService.findOne(id);
  }
  
  @Patch(':id')
  @Roles(Rol.Coordinador)
  @Permisos('crear-eps')
  update(@Param() { id }: UuidDto, @Body() updateEpDto: UpdateEpsDto) {
    return this.epsService.update(id, updateEpDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador)
  @Permisos('crear-eps')
  remove(@Param() { id }: UuidDto) {
    return this.epsService.remove(id);
  }
}
