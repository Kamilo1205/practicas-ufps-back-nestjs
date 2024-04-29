import { Injectable } from '@nestjs/common';
import { CreateEstudianteEpsDto, UpdateEstudianteEpsDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEps } from './entities/estudiante-eps.entity';
import { Repository } from 'typeorm';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { EpsService } from 'src/eps/eps.service';
import { TipoAfiliacionEpsService } from 'src/tipo-afiliacion-eps/tipo-afiliacion-eps.service';
import { GoogleDriveService } from 'src/google-drive/google-drive.service';
import { EstudianteEpsExistsException, EstudianteEpsNotFoundException } from './exceptions';

@Injectable()
export class EstudianteEpsService {
  constructor(
    @InjectRepository(EstudianteEps)
    private readonly estudianteEpsRepository: Repository<EstudianteEps>,
    private readonly estudiantesService: EstudiantesService,
    private readonly epsService: EpsService,
    private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  async create(createEstudianteEpsDto: CreateEstudianteEpsDto, documento: Express.Multer.File, folderId: string) {
    const { estudianteId, epsId, tipoAfiliacionEpsId } = createEstudianteEpsDto;
    
    const estudiante = await this.estudiantesService.findOne(estudianteId);
    const eps = await this.epsService.findOne(epsId);
    const tipoAfiliacion = await this.tipoAfiliacionEpsService.findOne(tipoAfiliacionEpsId);

    const existingEstudianteEps = await this.estudianteEpsRepository.findOneBy({ estudiante, eps, tipoAfiliacion });
    if (existingEstudianteEps) throw new EstudianteEpsExistsException(estudianteId);
    
    const documentoAfiliacionUrl = await this.googleDriveService.uploadFile('Afiliacion EPS', [folderId], documento);
    const estudianteEps = this.estudianteEpsRepository.create({ ...createEstudianteEpsDto, documentoAfiliacionUrl });
    return this.estudianteEpsRepository.save(estudianteEps);
  }

  findAll() {
    return this.estudianteEpsRepository.find();
  }

  async findOne(id: string) {
    const estudianteEps = await this.estudianteEpsRepository.findOneBy({ id });
    if(!estudianteEps) throw new EstudianteEpsNotFoundException(id);
    return estudianteEps;
  }

  async update(id: string, updateEstudianteEpsDto: UpdateEstudianteEpsDto, documento: Express.Multer.File, folderId: string) {
    const estudianteEps = await this.estudianteEpsRepository.findOneBy({ id });
    if (!estudianteEps) throw new EstudianteEpsNotFoundException(id);
    
    const { estudianteId, epsId, tipoAfiliacionEpsId } = updateEstudianteEpsDto;
    if (estudianteId && estudianteEps.estudiante.id != estudianteId && 
        epsId && estudianteEps.eps.id != epsId && 
        tipoAfiliacionEpsId && estudianteEps.tipoAfiliacion.id != tipoAfiliacionEpsId
    ) {
      const estudiante = await this.estudiantesService.findOne(estudianteId);
      const eps = await this.epsService.findOne(epsId);
      const tipoAfiliacion = await this.tipoAfiliacionEpsService.findOne(tipoAfiliacionEpsId);

      const existingEstudianteEps = await this.estudianteEpsRepository.findOneBy({ estudiante, eps, tipoAfiliacion });
      if (existingEstudianteEps) throw new EstudianteEpsExistsException(estudianteId);
    }
    
    if (documento) {
      const [documentoAfiliacionUrl] = await Promise.all([
        this.googleDriveService.uploadFile('Afiliacion EPS', [folderId], documento),
        this.googleDriveService.deleteFile(estudianteEps.documentoAfiliacionUrl)
      ]);
      await this.estudianteEpsRepository.update(id, { ...updateEstudianteEpsDto, documentoAfiliacionUrl });
    }
    await this.estudianteEpsRepository.update(id, updateEstudianteEpsDto);
    return this.estudianteEpsRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const estudianteEps = await this.estudianteEpsRepository.findOneBy({ id });
    if(!estudianteEps) throw new EstudianteEpsNotFoundException(id);
    return this.estudianteEpsRepository.softRemove(estudianteEps);
  }
}
