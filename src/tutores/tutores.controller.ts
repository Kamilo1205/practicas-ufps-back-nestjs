import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TutoresService } from './tutores.service';
import { CreateTutoreDto } from './dto/create-tutor.dto';
import { UpdateTutoreDto } from './dto/update-tutor.dto';
import { Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';

@Controller('tutores')
export class TutoresController {
  constructor(private readonly tutoresService: TutoresService) {}

  @Post()
  @Roles(Rol.Coordinador, Rol.Administrador)
  create(@Body() createTutoreDto: CreateTutoreDto) {
    return this.tutoresService.create(createTutoreDto);
  }

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll() {
    return this.tutoresService.findAll();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id') id: string) {
    return this.tutoresService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  update(@Param('id') id: string, @Body() updateTutoreDto: UpdateTutoreDto) {
    return this.tutoresService.update(+id, updateTutoreDto);
  }

  @Delete(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  remove(@Param('id') id: string) {
    return this.tutoresService.remove(+id);
  }
}
