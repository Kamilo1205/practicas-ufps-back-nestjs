import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semestre } from './entities/semestre.entity';
import { SemestreService } from './semestre.service';
import { SemestreController } from './semestre.controller';
import { AnioModule } from 'src/anio/anio.module';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Semestre]), AnioModule, GoogleDriveModule],
  controllers: [SemestreController],
  providers: [SemestreService],
  exports: [SemestreModule]
})
export class SemestreModule {}
