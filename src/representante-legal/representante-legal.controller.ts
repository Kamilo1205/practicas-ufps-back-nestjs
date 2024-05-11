import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepresentanteLegalService } from './representante-legal.service';
import { CreateRepresentanteLegalDto, UpdateRepresentanteLegalDto } from './dto';
import { UuidDto } from 'src/common/dto';

@Controller('representante-legal')
export class RepresentanteLegalController {
  constructor(private readonly representanteLegalService: RepresentanteLegalService) {}

  @Post()
  create(@Body() createRepresentanteLegalDto: CreateRepresentanteLegalDto) {
    return this.representanteLegalService.create(createRepresentanteLegalDto);
  }

  @Get()
  findAll() {
    return this.representanteLegalService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidDto) {
    return this.representanteLegalService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto) {
    return this.representanteLegalService.update(id, updateRepresentanteLegalDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.representanteLegalService.remove(id);
  }
}
