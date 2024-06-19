import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RepresentanteLegalService } from './representante-legal.service';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from './dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('representante-legal')
export class RepresentanteLegalController {
  constructor(private readonly representanteLegalService: RepresentanteLegalService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto) {
    return this.representanteLegalService.create(createRepresentanteLegalDto);
  }

  @Get()
  findAll() {
    return this.representanteLegalService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.representanteLegalService.findOne(id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto) {
    return this.representanteLegalService.update(id, updateRepresentanteLegalDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.representanteLegalService.remove(id);
  }
}
