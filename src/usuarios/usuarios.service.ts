import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { Usuario } from './entities/usuario.entity';
import { PermisosService } from '../permisos/permisos.service';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly permisosService: PermisosService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { password } = createUsuarioDto;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    return this.usuariosRepository.save({
      ...createUsuarioDto,
      password: hashedPassword,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.usuariosRepository.findAndCount({
      take: limit,
      skip: skip,
      order: {
        fechaCreacion: 'DESC',
      },
      relations: ['rol'],
    });

    return { data, total };
  }

  findOne(
    id: string,
    relations: string[] = ['empresa', 'estudiante', 'rol', 'permisos'],
  ) {
    return this.usuariosRepository.findOne({
      where: { id },
      relations,
    });
  }

  findOneByEmail(
    email: string,
    relations: string[] = ['empresa', 'estudiante', 'rol', 'permisos'],
  ) {
    return this.usuariosRepository.findOne({
      where: { email },
      relations,
    });
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
    const { password } = updateUsuarioDto;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    return this.usuariosRepository.update(id, {
      ...updateUsuarioDto,
      ...(hashedPassword && { password: hashedPassword }),
    });
  }

  updateRefreshToken(id: string, refreshToken: string) {
    return this.usuariosRepository.update(id, {
      currentHashedRefreshToken: refreshToken,
    });
  }

  async addPermisos(id: string, permisosIds: string[]) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: ['permisos'],
    });
    if (!usuario)
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

    const permisos = await this.permisosService.findByIds(permisosIds);
    usuario.permisos = [...usuario.permisos, ...permisos];
    return this.usuariosRepository.save(usuario);
  }

  remove(id: string) {
    return this.usuariosRepository.softDelete({ id });
  }

  removeRefreshToken(id: string) {
    return this.usuariosRepository.update(id, {
      currentHashedRefreshToken: null,
    });
  }
}
