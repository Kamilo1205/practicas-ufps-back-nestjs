import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentariosService } from './comentarios.service';
import { ComentariosController } from './comentarios.controller';
import { Comentario } from './entities/comentario.entity';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { ObjetivosModule } from 'src/objetivos/objetivos.module';
import { ActividadesModule } from 'src/actividades/actividades.module';
import { SubActividadesModule } from 'src/sub-actividades/sub-actividades.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comentario]),
    UsuariosModule,
    ObjetivosModule,
    ActividadesModule,
    SubActividadesModule
  ],
  controllers: [ComentariosController],
  providers: [ComentariosService],
})
export class ComentariosModule {}
