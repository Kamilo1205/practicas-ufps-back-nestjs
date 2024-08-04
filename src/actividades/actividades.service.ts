import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActividadeDto, UpdateActividadeDto } from './dto';
import { Actividad } from './entities/actividad.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PlanDeTrabajoService } from 'src/plan-de-trabajo/plan-de-trabajo.service';
import { SemestreService } from 'src/semestre/semestre.service';
import { SeccionActividades } from './entities/seccion-actividades.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
    @InjectRepository(SeccionActividades)
    private readonly seccionActividadesRepository: Repository<SeccionActividades>,
    private readonly planDeTrabajoService: PlanDeTrabajoService,
    private readonly semestreService: SemestreService
  ) {}

  async create(usuario: Usuario, createActividadeDto: CreateActividadeDto) {
    const semestreActual = await this.semestreService.getSemestreActual();
    const planDeTrabajo = await this.planDeTrabajoService.findOrCreatePlanDeTrabajo(usuario.estudiante.id, semestreActual.id);
    let seccionActividades = planDeTrabajo.seccionActividades;
    
    if (!seccionActividades) seccionActividades = await this.seccionActividadesRepository.save({ planDeTrabajo, actividades: [], comentarios: [] });
    const actividad = this.actividadRepository.create({ ...createActividadeDto, seccionActividades });
    return this.actividadRepository.save(actividad);
  }

  async findOne(id: string) {
    const actividad = await this.actividadRepository.findOne({ 
      where: { id },
      relations: ['subActividades', 'subActividades']
    });
    if (!actividad) throw new NotFoundException(`La actividad con el id ${id} no fue encontrada`);
    return actividad;
  }

  async findOneByUsuario(id: string, usuario: Usuario) {
    const actividad = await this.actividadRepository.findOne({ 
      where: { id, seccionActividades: { planDeTrabajo: { estudiante: { id: usuario.estudiante.id } } }},
      relations: ['subActividades', 'subActividades']
    });
    if (!actividad) throw new NotFoundException(`La actividad con el id ${id} no fue encontrada`);
    return actividad;
  }

  async update(id: string, usuario: Usuario, updateActividadeDto: UpdateActividadeDto) {
    const actividad = await this.actividadRepository.findOne({ where: { id, seccionActividades: {planDeTrabajo: { estudiante: { id: usuario.estudiante.id } } }}, });
    if (!actividad) throw new NotFoundException(`La actividad con el id ${id} no fue encontrada`);
    return this.actividadRepository.update(id, updateActividadeDto);
  }

  async remove(id: string, usuario: Usuario) {
    const actividad = await this.actividadRepository.findOne({ where: { id, seccionActividades: { planDeTrabajo: { estudiante: { id: usuario.estudiante.id } } }}, });
    if (!actividad) throw new NotFoundException(`La actividad con el id ${id} no fue encontrada`);
    return this.actividadRepository.delete(id);
  }
}
