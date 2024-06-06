import { Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CiudadesService } from 'src/ciudades/ciudades.service';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    private readonly ciudadesService: CiudadesService
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto, usuario: Usuario) {
    const ciudad = await this.ciudadesService.findOne(createEstudianteDto.ciudadResidenciaId);
    const estudiante = this.estudianteRepository.create({ ...createEstudianteDto, ciudadResidencia: ciudad, usuario });
    return this.estudianteRepository.save(estudiante);
  }

  findAll(grupo?: string) {
    const whereCondition = grupo ? { grupo } : {};
    
    return this.estudianteRepository.find({
      relations: ['usuario', 'ciudadResidencia', 'ciudadResidencia.departamento'],
      where: whereCondition
    });
  }

  findOne(id: string) {
    return this.estudianteRepository.findOne({ where: { id }, relations: ['usuario'] });
  }

  update(id: string, updateEstudianteDto: UpdateEstudianteDto) {
    return this.estudianteRepository.update(id, updateEstudianteDto);
  }

  remove(id: string) {
    return this.estudianteRepository.softDelete({ id });
  }
}
