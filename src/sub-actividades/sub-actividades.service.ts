import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubActividadDto, UpdateSubActividadDto } from './dto';
import { SubActividad } from './entities/sub-actividad.entity';
import { Repository } from 'typeorm';
import { ActividadesService } from 'src/actividades/actividades.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class SubActividadesService {
  constructor(
    @InjectRepository(SubActividad)
    private subActividadRepository: Repository<SubActividad>,
    private actividadService: ActividadesService,
  ) {}

  async create(createSubActividadDto: CreateSubActividadDto, usuario: Usuario) {
    const { actividadId } = createSubActividadDto;
    const actividad = await this.actividadService.findOneByUsuario(
      actividadId,
      usuario,
    );
    const subActividad = this.subActividadRepository.create({
      ...createSubActividadDto,
      actividad,
    });
    return this.subActividadRepository.save(subActividad);
  }

  async findOne(id: string) {
    const subActividad = await this.subActividadRepository.findOne({
      where: { id },
    });
    if (!subActividad)
      throw new NotFoundException(`SubActividad con id ${id} no encontrada`);
    return subActividad;
  }

  async findOneByUsuario(id: string, usuario: Usuario) {
    const subActividad = await this.subActividadRepository.findOne({
      where: {
        id,
        actividad: {
          seccionActividades: {
            planDeTrabajo: { estudiante: { id: usuario.estudiante.id } },
          },
        },
      },
    });
    if (!subActividad)
      throw new NotFoundException(`SubActividad con id ${id} no encontrada`);
    return subActividad;
  }

  async update(
    id: string,
    updateSubActividadDto: UpdateSubActividadDto,
    usuario: Usuario,
  ) {
    const subActividad = await this.subActividadRepository.findOne({
      where: {
        id,
        actividad: {
          seccionActividades: {
            planDeTrabajo: { estudiante: { id: usuario.estudiante.id } },
          },
        },
      },
    });
    if (!subActividad)
      throw new NotFoundException(`SubActividad con id ${id} no encontrada`);
    return this.subActividadRepository.update(id, updateSubActividadDto);
  }

  async remove(id: string, usuario: Usuario) {
    const subActividad = await this.subActividadRepository.findOne({
      where: {
        id,
        actividad: {
          seccionActividades: {
            planDeTrabajo: { estudiante: { id: usuario.estudiante.id } },
          },
        },
      },
    });
    if (!subActividad)
      throw new NotFoundException(`SubActividad con id ${id} no encontrada`);
    return this.subActividadRepository.delete(id);
  }
}
