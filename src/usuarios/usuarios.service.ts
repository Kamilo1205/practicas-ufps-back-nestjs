import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './entities/usuario.entity';
import { PermisosService } from '../permisos/permisos.service';
import { UsuairoExistsException, UsuarioNotFoundException } from './exceptions';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly permisosService: PermisosService,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { email, password } = createUsuarioDto;
    const existingUsuario = await this.usuariosRepository.findOneBy({ email });
    if (existingUsuario) throw new UsuairoExistsException(email);

    const rol = await this.rolesService.findOne(createUsuarioDto.rolId);
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const usuario = this.usuariosRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
      rol
    });
    return this.usuariosRepository.save(usuario);
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usuariosRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      }
    });

    return { data, total };
  }

  async findOne(id: string, relations: string[] = ['empresa', 'estudiante', 'permisos']) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations,
    });
    if (!usuario) throw new UsuarioNotFoundException(id);
    return usuario;
  }

  async findOneByEmail(email: string, relations: string[] = ['empresa', 'estudiante', 'permisos']) {
    const usuario = await this.usuariosRepository.findOne({
      where: { email },
      relations,
    });
    return usuario;
  }

  async getUserIfRefreshTokenMatches(usuarioId: string, refreshToken: string) {
    const usuario = await this.findOne(usuarioId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      usuario.currentHashedRefreshToken,
    );
    if (!isRefreshTokenMatching) return null;
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuariosRepository.findOneBy({ id });
    if (usuario) throw new UsuarioNotFoundException(id);

    const { email, password, rolId } = updateUsuarioDto;
    if (email && usuario.email != email) {
      const existingUsuario = await this.usuariosRepository.findOneBy({ email });
      if (existingUsuario) throw new UsuairoExistsException(email);
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const rol = rolId ? await this.rolesService.findOne(rolId) : undefined;
    await this.usuariosRepository.update(id, {
      ...updateUsuarioDto,
      ...(rol && { rol }),
      ...(hashedPassword && { password: hashedPassword }),
    });
    return this.usuariosRepository.findOneBy({ id });
  }

  async updatePassword(email: string, newPassword: string) {
    const usuario = await this.usuariosRepository.findOneBy({ email });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.usuariosRepository.update(usuario.id, { password: hashedPassword });
  }

  updateRefreshToken(id: string, currentHashedRefreshToken: string) {
    return this.usuariosRepository.update(id, { currentHashedRefreshToken });
  }

  async addPermisos(id: string, permisosIds: string[]) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['permisos'],
    });
    if (!usuario) throw new UsuarioNotFoundException(id);
    const permisos = await this.permisosService.findByIds(permisosIds);
    usuario.permisos = [...usuario.permisos, ...permisos];
    return this.usuariosRepository.save(usuario);
  }

  async remove(id: string) {
    const usuarioExists = await this.usuariosRepository.findOneBy({ id });
    if (usuarioExists) throw new UsuarioNotFoundException(id);
    return this.usuariosRepository.softDelete({ id });
  }

  removeRefreshToken(id: string) {
    return this.usuariosRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
