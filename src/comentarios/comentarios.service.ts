import { Repository } from 'typeorm';
import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { seccionActividadesId, objetivoId } = createComentarioDto;  

    if (seccionActividadesId && objetivoId) 
      throw new BadGatewayException('Debe proporcionar solo un ID de objetivo o actividad.');
    
    if (!seccionActividadesId && !objetivoId) 
      throw new BadGatewayException('Debe proporcionar al menos un ID de objetivo o actividad.');

    let seccionActividades = null;
    let objetivo = null;

    if (seccionActividadesId) seccionActividades = await this.actividadesService.findOne(seccionActividadesId);
    if (objetivoId) objetivo = await this.objetivosService.findOne(objetivoId);
    
    const comentario = this.comentarioRepository.create({
      ...createComentarioDto,
      autor,
      seccionActividades,
      objetivo,
    });

    return this.comentarioRepository.save(comentario);
  }

  async update(id: string, updateComentario: UpdateComentarioDto, usuario: Usuario) {
    const comentario = await this.comentarioRepository.findOne({ where: { id, autor: { id: usuario.id } } });   
    return this.comentarioRepository.save({ ...comentario, comentario: updateComentario.comentario });
  }

  async remove(id: string, usuario: Usuario) {
    const comentario = await this.comentarioRepository.findOne({ where: { id, autor: { id: usuario.id } } });
    if (!comentario) throw new NotFoundException(`Comentario con id ${id} no encontrado`);
    return this.comentarioRepository.delete(id);
  }
}
