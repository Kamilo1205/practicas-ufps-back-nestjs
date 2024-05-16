import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RepresentanteLegalService } from './representante-legal.service';
import { CreateRepresentanteLegalDto } from './dto/create-representante-legal.dto';
import { UpdateRepresentanteLegalDto } from './dto/update-representante-legal.dto';

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
  findOne(@Param('id') id: string) {
    return this.representanteLegalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRepresentanteLegalDto: UpdateRepresentanteLegalDto) {
    return this.representanteLegalService.update(+id, updateRepresentanteLegalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.representanteLegalService.remove(+id);
  }
}
