import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTipoAfiliacionEpsDto, UpdateTipoAfiliacionEpsDto } from './dto';
import { TipoAfiliacionEpsService } from './tipo-afiliacion-eps.service';
import { UuidDto } from 'src/common/dto';

@Controller('tipo-afiliacion-eps')
export class TipoAfiliacionEpsController {
  constructor(private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService) {}

  @Post()
  create(@Body() createTipoAfiliacionEpsDto: CreateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.create(createTipoAfiliacionEpsDto);
  }

  @Get()
  findAll() {
    return this.tipoAfiliacionEpsService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.tipoAfiliacionEpsService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updateTipoAfiliacionEpDto: UpdateTipoAfiliacionEpsDto) {
    return this.tipoAfiliacionEpsService.update(id, updateTipoAfiliacionEpDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.tipoAfiliacionEpsService.remove(id);
  }
}
