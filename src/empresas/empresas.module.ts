import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { Empresa } from './entities/empresa.entity';
import { RepresentanteLegalModule } from 'src/representante-legal/representante-legal.module';
import { GoogleDriveModule } from 'src/google-drive/google-drive.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Empresa]),
    GoogleDriveModule,
    RepresentanteLegalModule,
  ],
  controllers: [EmpresasController],
  providers: [EmpresasService],
})
export class EmpresasModule {}
