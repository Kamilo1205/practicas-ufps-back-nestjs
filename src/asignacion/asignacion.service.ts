import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate } from 'nestjs-paginate';
import { AsignarTutorDto, CreateAsignacionDto } from './dto';
import { Asignacion } from './entities/asignacion.entity';
import { TutoresService } from 'src/tutores/tutores.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { EmpresasSolicitudesService } from 'src/empresas-solicitudes/empresas-solicitudes.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

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
        'solicitud.semestre.id': [FilterOperator.EQ, FilterOperator.CONTAINS],
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
  
  async asignarTutor(id: string, usuario: Usuario, asignarTutorDto: AsignarTutorDto) {
    const asignacion = await this.asignacionRepository.findOne({ where: { id }, relations: ['estudiante', 'solicitud', 'tutor'] });
    if (!asignacion) throw new NotFoundException('Asignación no encontrada');

    // Verificar que la solicitud pertenece a la empresa
    if (asignacion.solicitud.empresa.id !== usuario.id) {
      throw new ForbiddenException('No tienes permiso para asignar un tutor a esta solicitud');
    }

    const tutor = await this.tutoresService.findOne(asignarTutorDto.tutorId);

    // Verificar que el tutor pertenece a la empresa
    if (tutor.empresa.id !== usuario.id) {
      throw new ForbiddenException('No tienes permiso para asignar este tutor');
    }

    await this.asignacionRepository.update(id, { tutor });
    return this.asignacionRepository.findOne({ where: { id }, relations: ['estudiante', 'solicitud', 'tutor'] });
  }

  async remove(id: string) {
    const asignacion = await this.findOne(id);
    if (!asignacion) throw new NotFoundException('Asignación no encontrada');
    return this.asignacionRepository.delete(id);
  }
}
