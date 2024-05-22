import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RolesModule } from 'src/roles/roles.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { SeederController } from './seeder.controller';

@Module({
  imports: [UsuariosModule, RolesModule],
  providers: [SeederService],
  controllers: [SeederController]
})
export class SeederModule {}
