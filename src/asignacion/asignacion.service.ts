import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsignacionDto, UpdateAsignacionDto } from './dto';
import { Asignacion } from './entities/asignacion.entity';
import { TutoresService } from 'src/tutores/tutores.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { SemestreService } from 'src/semestre/semestre.service';
import { EmpresasSolicitudesService } from 'src/empresas-solicitudes/empresas-solicitudes.service';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate } from 'nestjs-paginate';
import { AsignarTutorDto } from './dto/asignar-tutor.dto';

@Injectable()
export class AsignacionService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignacionRepository: Repository<Asignacion>,
    private readonly empresasSolicitudesService: EmpresasSolicitudesService,
    private readonly estudiantesService: EstudiantesService,
    private readonly tutoresService: TutoresService,
  ) {}

  async create(createAsignacionDto: CreateAsignacionDto) {
    const { estudianteId, solicitudId } = createAsignacionDto;
    const [estudiante, solicitud] = await Promise.all([
      this.estudiantesService.findOne(estudianteId),
      this.empresasSolicitudesService.findOne(solicitudId),
    ]);

    const existingAssignmentsCount = await this.asignacionRepository.count({
      where: { solicitud: { id: solicitudId } },
    });

    if (existingAssignmentsCount >= solicitud.cantidadPracticantes) {
      throw new BadRequestException('No se pueden asignar más estudiantes que la cantidad solicitada');
    }

    const asignacion = this.asignacionRepository.create({
      estudiante,
      solicitud,
      estado: 'Pendiente de Tutor',
    });
    return this.asignacionRepository.save(asignacion);
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.asignacionRepository, {
      sortableColumns: ['id', 'estado', 'solicitud.semestre.id'],
      searchableColumns: [
        'estado', 
        'estudiante.primerNombre',
        'estudiante.segundoNombre',
        'estudiante.primerApellido',
        'estudiante.codigo',
        'estudiante.usuario.email',
        'estudiante.numeroDocumento',
        'tutor.nombre',
        'tutor.usuario.email',
        'solicitud.empresa.nombreComercial',
        'solicitud.empresa.nombreLegal'
      ],
      relations: ['estudiante', 'solicitud', 'tutor'],
      filterableColumns: {
        estado: [FilterOperator.EQ, FilterOperator.CONTAINS, FilterSuffix.NOT],
        'estudiante.nombre': [FilterOperator.EQ, FilterOperator.CONTAINS],
        'solicitud.id': [FilterOperator.EQ],
        'empresa.nombreComercial': [FilterOperator.EQ, FilterOperator.CONTAINS],
        'semestre.id': [FilterOperator.EQ, FilterOperator.CONTAINS],
        'tutor.nombre': [FilterOperator.EQ, FilterOperator.CONTAINS],
      },
      nullSort: 'last',
      withDeleted: true,
    });
  }

  async findOne(id: string) {
    const asigancion = await this.asignacionRepository.findOne({ where: { id }, relations: ['estudiante', 'solicitud', 'tutor'] });
    if (!asigancion) throw new NotFoundException('Asignación no encontrada');
    return asigancion;
  }
  
  async asignarTutor(id: string, asignarTutorDto: AsignarTutorDto) {
    const asigancion = await this.asignacionRepository.findOne({ where: { id }, relations: ['estudiante', 'solicitud', 'tutor'] });
    if (!asigancion) throw new NotFoundException('Asignación no encontrada');
    const tutor = await this.tutoresService.findOne(asignarTutorDto.tutorId);
    await this.asignacionRepository.update(id, { tutor });
    return this.asignacionRepository.findOne({ where: { id }, relations: ['estudiante', 'solicitud', 'tutor'] });
  }

  async remove(id: string) {
    const asignacion = await this.findOne(id);
    if (!asignacion) throw new NotFoundException('Asignación no encontrada');
    return this.asignacionRepository.delete(id);
  }
}
