import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { Director } from './entities/director.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Director]),
    UsuariosModule
  ],
  controllers: [DirectorController],
  providers: [DirectorService],
  exports: [DirectorService]
})
export class DirectorModule {}
