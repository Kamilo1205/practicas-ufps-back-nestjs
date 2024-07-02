import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIntensidadHorariaDto, UpdateIntensidadHorariaDto } from './dto';
import { IntensidadHoraria } from './entities/intensidad-horaria.entity';
import { PlanDeTrabajoService } from 'src/plan-de-trabajo/plan-de-trabajo.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { SemestreService } from 'src/semestre/semestre.service';

@Injectable()
export class IntensidadHorariaService {
  constructor(
    @InjectRepository(IntensidadHoraria)
    private readonly intensidadHorariaRepository: Repository<IntensidadHoraria>,
    private readonly planDeTrabajoServicio: PlanDeTrabajoService,
    private readonly semestreService: SemestreService
  ) {}

  async create(createIntensidadHorariaDto: CreateIntensidadHorariaDto, usuario: Usuario) {
    const semestreActual = await this.semestreService.getSemestreActual();
    const planDeTrabajo = await this.planDeTrabajoServicio.findOrCreatePlanDeTrabajo(usuario.estudiante.id, semestreActual.id);
    const intensidadHoraria = this.intensidadHorariaRepository.create({ ...createIntensidadHorariaDto, planDeTrabajo });
    return this.intensidadHorariaRepository.save(intensidadHoraria);
  }

  async update(id: string, updateIntensidadHorariaDto: UpdateIntensidadHorariaDto, usuario: Usuario) {
    const intensidadHoraria = await this.intensidadHorariaRepository.findOne({ where: { id, planDeTrabajo: { estudiante: { id: usuario.estudiante.id } } } });
    if (!intensidadHoraria) throw new NotFoundException(`Intensidad horaria con id ${id} no encontrada`);
    return this.intensidadHorariaRepository.update(id, updateIntensidadHorariaDto);
  }
}
