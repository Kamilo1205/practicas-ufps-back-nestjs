import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnioService } from './anio.service';
import { AnioController } from './anio.controller';
import { Anio } from './entities/anio.entity';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';

@Module({
  imports: [TypeOrmModule.forFeature([Anio]), GoogleDriveModule],
  controllers: [AnioController],
  providers: [AnioService],
  exports: [AnioService]
})
export class AnioModule {}
