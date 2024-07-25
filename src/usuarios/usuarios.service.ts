import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { RolesService } from 'src/roles/roles.service';
import { UsuairoExistsException, UsuarioNotFoundException } from './exceptions';
import { Usuario } from './entities/usuario.entity';
import { Rol } from 'src/auth/enums';
import * as crypto from 'crypto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly rolesService: RolesService
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email, password } = createUsuarioDto;
    const normalizedEmail = email.toLowerCase();
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(normalizedEmail);

    const roles = await this.rolesService.findByIds(createUsuarioDto.rolesIds);
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const usaurio = this.usuariosRepository.create({ ...createUsuarioDto, email: normalizedEmail, password: hashedPassword, roles });
    return this.usuariosRepository.save(usaurio);
  }

  async createTutor(email: string, displayName: string) {
    const normalizedEmail = email.toLowerCase();
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(normalizedEmail);

    const rol = await this.rolesService.findOneByNombre(Rol.Tutor);
    const hashedPassword = await bcrypt.hash(crypto.randomBytes(8).toString('hex'), 10);
    const usaurio = this.usuariosRepository.create({ 
      email: normalizedEmail, 
      password: hashedPassword, 
      roles: [rol],
      estaActivo: true,
      estaRegistrado: true,    
    });
    return this.usuariosRepository.save(usaurio);
  }

  async createTutorInstitucional(email: string, displayName: string) {
    const normalizedEmail = email.toLowerCase();
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(normalizedEmail);

    const rol = await this.rolesService.findOneByNombre(Rol.Coordinador);
    const hashedPassword = await bcrypt.hash(crypto.randomBytes(8).toString('hex'), 10);
    const usaurio = this.usuariosRepository.create({ 
      email: normalizedEmail, 
      password: hashedPassword, 
      roles: [rol],
      estaActivo: true,
      estaRegistrado: true,    
    });
    return this.usuariosRepository.save(usaurio);
  }

  async createDirector(email: string, displayName: string) {
    const normalizedEmail = email.toLowerCase();
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(normalizedEmail);

    const rol = await this.rolesService.findOneByNombre(Rol.Director);
    const hashedPassword = await bcrypt.hash(crypto.randomBytes(8).toString('hex'), 10);
    const usaurio = this.usuariosRepository.create({ 
      email: normalizedEmail, 
      password: hashedPassword, 
      roles: [rol],
      estaActivo: true,
      estaRegistrado: true,    
    });
    return this.usuariosRepository.save(usaurio);
  }

  async createEstudiante(email: string) {
    const normalizedEmail = email.toLowerCase();
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(normalizedEmail);

    const rol = await this.rolesService.findOneByNombre(Rol.Estudiante);
    const hashedPassword = await bcrypt.hash(crypto.randomBytes(8).toString('hex'), 10);
    const usaurio = this.usuariosRepository.create({ 
      email: normalizedEmail, 
      password: hashedPassword, 
      roles: [rol],
      estaActivo: true,
      estaRegistrado: false,    
    });
    return this.usuariosRepository.save(usaurio);
  }

  async findAll(page = 1, limit = 50, relations: string[] = ['roles']) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usuariosRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
      relations,
    });
    return { data, total };
  }

  async findOne(id: string, relations: string[] = ['empresa', 'estudiante', 'roles']) {
    const usuario = await this.usuariosRepository.findOne({ where: { id }, relations });
    if (!usuario) throw new UsuarioNotFoundException(id);
    return usuario;
  }

  async findOneByEmail(email: string, relations: string[] = ['empresa', 'estudiante', 'roles']) {
    const normalizedEmail = email.toLowerCase();
    const usuario = await this.usuariosRepository.findOne({ where: { email: normalizedEmail }, relations });
    return usuario;
  }

  async getUserIfRefreshTokenMatches(id: string, refreshToken: string) {
    const usuario = await this.findOne(id);
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, usuario.currentHashedRefreshToken);
    return isRefreshTokenMatching ? usuario : null;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new UsuarioNotFoundException(id);

    const { email, password, rolesIds } = updateUsuarioDto;
    if (email && usuario.email != email) {
      const usuario = await this.usuariosRepository.findOneBy({ email: email.toLowerCase() });
      if (usuario) throw new UsuairoExistsException(email);
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const roles = rolesIds ? await this.rolesService.findByIds(rolesIds) : usuario.roles;

    const usuarioActualizar = this.usuariosRepository.create({ 
      ...usuario, 
      ...updateUsuarioDto,
      roles,
      email: email ? email.toLowerCase() : usuario.email,
      ...(hashedPassword && { password: hashedPassword }),  
    });
    await this.usuariosRepository.save(usuarioActualizar);
    return this.usuariosRepository.findOneBy({ id });
  }

  async updatePassword(email: string, password: string) {
    const usuario = await this.usuariosRepository.findOneBy({ email });
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usuariosRepository.update(usuario.id, { password: hashedPassword });
  }

  updateRefreshToken(id: string, currentHashedRefreshToken: string) {
    return this.usuariosRepository.update(id, { currentHashedRefreshToken });
  }

  async remove(id: string) {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (usuario) throw new UsuarioNotFoundException(id);
    return this.usuariosRepository.softDelete({ id });
  }

  removeRefreshToken(id: string) {
    return this.usuariosRepository.update(id, { currentHashedRefreshToken: null });
  }
}
