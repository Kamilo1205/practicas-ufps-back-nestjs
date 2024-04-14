import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Empresa } from './entities/empresa.entity';
import { GoogleDriveService } from '../google-drive/google-drive.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  controllers: [EmpresasController],
  providers: [EmpresasService, GoogleDriveService],
})
export class EmpresasModule {}
