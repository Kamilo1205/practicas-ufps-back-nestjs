import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpsService } from './eps.service';
import { CreateEpsDto, UpdateEpsDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { UuidDto } from 'src/common/dto';

@Controller('eps')
export class EpsController {
  constructor(private readonly epsService: EpsService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createEpDto: CreateEpsDto) {
    return this.epsService.create(createEpDto);
  }

  @Get()
  findAll() {
    return this.epsService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param() { id }: UuidDto) {
    return this.epsService.findOne(id);
  }
  
  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param() { id }: UuidDto, @Body() updateEpDto: UpdateEpsDto) {
    return this.epsService.update(id, updateEpDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param() { id }: UuidDto) {
    return this.epsService.remove(id);
  }
}
