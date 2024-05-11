import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DecanoService } from './decano.service';
import { CreateDecanoDto } from './dto/create-decano.dto';
import { UpdateDecanoDto } from './dto/update-decano.dto';
import { UuidDto } from 'src/common/dto';

@Controller('decano')
export class DecanoController {
  constructor(private readonly decanoService: DecanoService) {}

  @Post()
  create(@Body() createDecanoDto: CreateDecanoDto) {
    return this.decanoService.create(createDecanoDto);
  }

  @Get()
  findOne() {
    return this.decanoService.findOne();
  }

  @Get('/all')
  findAll() {
    return this.decanoService.findAll();
  }

  @Get(':id')
  findOneById(@Param() { id }: UuidDto) {
    return this.decanoService.findOneById(id);
  }

  @Patch(':id')
  update(@Param() { id }: UuidDto, @Body() updateDecanoDto: UpdateDecanoDto) {
    return this.decanoService.update(id, updateDecanoDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidDto) {
    return this.decanoService.remove(id);
  }
}
