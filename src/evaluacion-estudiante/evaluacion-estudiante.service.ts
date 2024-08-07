import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EvaluacionEstudiante } from './entities/evaluacion-estudiante.entity';
import { CreateEvaluacionEstudianteDto, UpdateEvaluacionEstudianteDto } from './dto';

@Injectable()
export class EvaluacionEstudianteService {
  constructor(
    @InjectRepository(EvaluacionEstudiante)
    private readonly evaluacionEstudianteRepository: Repository<EvaluacionEstudiante>,
  ) {}

  async create(createEvaluacionEstudianteDto: CreateEvaluacionEstudianteDto) {
    const evaluacionEstudiante = this.evaluacionEstudianteRepository.create(createEvaluacionEstudianteDto);
    return this.evaluacionEstudianteRepository.save(evaluacionEstudiante);
  }

  async update(id: string, updateEvaluacionEstudianteDto: UpdateEvaluacionEstudianteDto) {
    const evaluacionEstudiante = this.evaluacionEstudianteRepository.findOne({ where: { id } });
    if (!evaluacionEstudiante) throw new NotFoundException(`Evaluacion de estudiante con id ${id} no encontrado`);
    return this.evaluacionEstudianteRepository.save({ evaluacionEstudiante, ...updateEvaluacionEstudianteDto });
  }
}
