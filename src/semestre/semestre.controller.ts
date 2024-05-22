import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemestreService } from './semestre.service';
import { CreateSemestreDto, UpdateSemestreDto } from './dto';

@Controller('semestre')
export class SemestreController {
  constructor(private readonly semestreService: SemestreService) {}

  @Post()
  create(@Body() createSemestreDto: CreateSemestreDto) {
    return this.semestreService.create(createSemestreDto);
  }

  @Get()
  findAll() {
    return this.semestreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semestreService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemestreDto: UpdateSemestreDto) {
    return this.semestreService.update(id, updateSemestreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semestreService.remove(id);
  }
}
