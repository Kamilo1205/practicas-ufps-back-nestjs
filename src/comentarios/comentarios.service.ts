import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateComentarioDto, UpdateComentarioDto } from './dto';
import { Comentario } from './entities/comentario.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ObjetivosService } from 'src/objetivos/objetivos.service';
import { ActividadesService } from 'src/actividades/actividades.service';
import { SubActividadesService } from 'src/sub-actividades/sub-actividades.service';

@Injectable()
export class ComentariosService {
  constructor(
    @InjectRepository(Comentario)
    private readonly comentarioRepository: Repository<Comentario>,
    private readonly usuariosService: UsuariosService,
    private readonly objetivosService: ObjetivosService,
    private readonly actividadesService: ActividadesService,
    private readonly subActividadesService: SubActividadesService,
  ) {}

  async create(createComentarioDto: CreateComentarioDto, usuario: Usuario) {
    const autor = await this.usuariosService.findOne(usuario.id);
    const { actividadId, objetivoId, subActividadId } = createComentarioDto;
    let [actividad, objetivo, subActividad] = [null, null, null];
    
    if (actividadId) 
      actividad = this.actividadesService.findOne(actividadId);
    
    if (objetivoId) 
      objetivo = this.objetivosService.findOne(objetivoId);
    
    if (subActividadId) 
      subActividad = this.subActividadesService.findOne(subActividadId);
    
    const comentario = this.comentarioRepository.create({
      ...createComentarioDto,
      actividad, 
      objetivo, 
      subActividad,
      autor
    });
    return this.comentarioRepository.save(comentario);
  }

  async remove(id: string, usuario: Usuario) {
    const comentario = await this.comentarioRepository.findOne({ where: { id, autor: { id: usuario.id } } });
    if (!comentario) throw new NotFoundException(`Comentario con id ${id} no encontrado`);
    return this.comentarioRepository.delete(id);
  }
}
