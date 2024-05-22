import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { Public } from 'src/auth/decorators';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  @Public()
  async seed() {
    await this.seederService.seed();
    return { message: 'Seeding complete!' };
  }
}
