import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAsignacionDto, UpdateAsignacionDto } from './dto';
import { Asignacion } from './entities/asignacion.entity';
import { TutoresService } from 'src/tutores/tutores.service';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { SemestreService } from 'src/semestre/semestre.service';
import { EmpresasSolicitudesService } from 'src/empresas-solicitudes/empresas-solicitudes.service';
import { FilterOperator, FilterSuffix, PaginateQuery, paginate } from 'nestjs-paginate';

@Injectable()
export class AsignacionService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignacionRepository: Repository<Asignacion>,
    private readonly empresasSolicitudesService: EmpresasSolicitudesService,
    private readonly estudiantesService: EstudiantesService,
    private readonly tutoresService: TutoresService,
  ) {}

  async create(createAsignacionDto: CreateAsignacionDto) {
    const { estudianteId, solicitudId, tutorId } = createAsignacionDto;
    const [estudiante, solicitud] = await Promise.all([
      this.estudiantesService.findOne(estudianteId),
      this.empresasSolicitudesService.findOne(solicitudId),
    ]);

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

  findOne(id: string) {
    return `This action returns a #${id} asignacion`;
  }

  update(id: string, updateAsignacionDto: UpdateAsignacionDto) {
    return `This action updates a #${id} asignacion`;
  }

  remove(id: string) {
    return `This action removes a #${id} asignacion`;
  }
}
