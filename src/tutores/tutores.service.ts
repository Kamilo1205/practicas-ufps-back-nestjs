import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTutorDto, UpdateTutorDto } from './dto';
import { Tutor } from './entities/tutor.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { EmpresasService } from 'src/empresas/empresas.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DependenciasService } from 'src/dependencias/dependencias.service';

@Injectable()
export class TutoresService {
  constructor(
    @InjectRepository(Tutor) private readonly tutorRepository: Repository<Tutor>,
    private readonly usuariosService: UsuariosService,
    private readonly empresasService: EmpresasService,
    private readonly dependenciasService: DependenciasService
  ) {}
  
  async create(usuario: Usuario, createTutorDto: CreateTutorDto) {
    const { email, nombre, apellidos } = createTutorDto;
    const displayName = `${nombre} ${apellidos}`;

    const usuarioTutor = await this.usuariosService.createTutor(email, displayName);
    let empresa = null;
    let dependencia = null;

    if (usuario.empresa) {
      empresa = await this.empresasService.findOne(usuario.empresa.id);
    } 
    if (usuario.dependencia) {
      dependencia = await this.dependenciasService.findOne(usuario.dependencia.id);
    }
    
    // Creación del tutor, asignando las relaciones si existen
    const tutor = this.tutorRepository.create({ 
      ...createTutorDto, 
      usuario, 
      empresa: empresa ? { id: empresa.id } : null,
      dependencia: dependencia ? { id: dependencia.id } : null
    });
    return this.tutorRepository.save(tutor);
  }

  async findAll() {
    return this.tutorRepository.find();
  }

  async findOne(id: string) {
    const tutor = await this.tutorRepository.findOne({ where: { id } });
    if (!tutor) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    return tutor;
  }

  async update(id: string, updateTutorDto: UpdateTutorDto) {
    const tutor = await this.tutorRepository.findOne({ where: { id } });
    if (!tutor) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    const { email, nombre, apellidos } = updateTutorDto;

    if (email && email !== tutor.usuario.email) {
      const existingUser = await this.usuariosService.findOneByEmail(email);
      if (existingUser && existingUser.id !== tutor.usuario.id) throw new ConflictException(`El tutor con el email ${email} ya existe`);  
      await this.usuariosService.update(tutor.usuario.id, { email });
    }

    if (nombre !== tutor.nombre || apellidos !== tutor.apellidos) {
      const displayName = `${nombre || tutor.nombre} ${apellidos || tutor.apellidos}`;
      await this.usuariosService.update(tutor.usuario.id, { displayName });
    }

    const updatedTutor = await this.tutorRepository.preload({ id, ...updateTutorDto });
    if (!updatedTutor) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    return this.tutorRepository.save(updatedTutor);
  }

  async remove(id: string) {
    const tutor = await this.tutorRepository.findOne({ where: { id } });
    if (!tutor) throw new NotFoundException(`El tutor con el ID ${id} no fue encontrado`);
    await this.tutorRepository.softRemove(tutor);
  }
}
