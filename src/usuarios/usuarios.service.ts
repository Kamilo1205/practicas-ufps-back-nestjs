import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { RolesService } from 'src/roles/roles.service';
import { UsuairoExistsException, UsuarioNotFoundException } from './exceptions';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email, password } = createUsuarioDto;
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(email);

    const roles = await this.rolesService.findByIds(createUsuarioDto.rolesIds);
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const usuario = this.usuariosRepository.create({ ...createUsuarioDto, password: hashedPassword, roles });
    return this.usuariosRepository.save(usuario);
  }

  async findAll(page = 1, limit = 10, relations: string[] = ['roles']) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usuariosRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
      relations
    });
    return { data, total };
  }

  async findOne(id: string, relations: string[] = ['empresa', 'estudiante', 'roles']) {
    const usuario = await this.usuariosRepository.findOne({ where: { id }, relations });
    if (!usuario) throw new UsuarioNotFoundException(id);
    return usuario;
  }

  async findOneByEmail(email: string, relations: string[] = ['empresa', 'estudiante', 'roles']) {
    const usuario = await this.usuariosRepository.findOne({ where: { email }, relations });
    return usuario;
  }

  async getUserIfRefreshTokenMatches(id: string, refreshToken: string) {
    const usuario = await this.findOne(id);
    const isRefreshTokenMatching = await bcrypt.compare(refreshToken, usuario.currentHashedRefreshToken);
    if (!isRefreshTokenMatching) return null;
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (!usuario) throw new UsuarioNotFoundException(id);

    const { email, password, rolesIds } = updateUsuarioDto;
    if (email && usuario.email != email) {
      const usuario = await this.usuariosRepository.findOneBy({ email });
      if (usuario) throw new UsuairoExistsException(email);
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const roles = rolesIds ? await this.rolesService.findByIds(rolesIds) : undefined;

    const usuarioActualizar = this.usuariosRepository.create({ 
      ...usuario, 
      ...updateUsuarioDto,
      ...(roles && { roles }),
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
