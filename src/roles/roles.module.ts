import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), PermisosModule],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
