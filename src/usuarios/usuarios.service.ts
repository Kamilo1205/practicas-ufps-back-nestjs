import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto, UpdateUsuarioDto } from './dto';
import { RolesService } from 'src/roles/roles.service';
import { UsuairoExistsException, UsuarioNotFoundException } from './exceptions';
import { Usuario } from './entities/usuario.entity';
import { FetchParamsDto } from 'src/common/dto';
import { Filtering, Pagination, Sorting } from 'src/common/decorators';
import { getOrder, getWhere } from 'src/common/helpers/typeorm-helper';

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

  async findAll({ page, limit, size, offset }: Pagination, sorts?: Sorting[], filters?: Filtering[], search?: string) {
    let where = getWhere(filters);
    const order = getOrder(sorts);
    
    if (search) {
      const sanitizedSearch = search.toLowerCase().replace(/\s+/g, '');
      const searchConditions = [
        { displayName: Like(`%${sanitizedSearch}%`) },
        { email: Like(`%${sanitizedSearch}%`) },
      ];
      where = [
        where,
        searchConditions
      ];
    }

    const [data, total] = await this.usuariosRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      total,
      data,
    };
  }

  // async findAll(page = 1, limit = 10, relations: string[] = ['roles']) {
  //   const skip = (page - 1) * limit;
  //   const [data, total] = await this.usuariosRepository.findAndCount({
  //     take: limit,
  //     skip: skip,
  //     order: {
  //       fechaCreacion: 'DESC',
  //     },
  //     relations,
  //   });
  //   return { data, total };
  // }

  /* async findAll(fetchParamsDto?: FetchParamsDto) {
    const { page = 1, limit = 10, sort = [], filters = {}, search = '' } = fetchParamsDto || {};

    const skip = (page - 1) * limit;

    const queryBuilder = this.usuariosRepository.createQueryBuilder('usuario');

    // Aplicar filtros
    for (const [key, value] of Object.entries(filters)) {
      queryBuilder.andWhere(`user.${key} LIKE :${key}`, { [key]: `%${value}%` });
    }

    // Aplicar búsqueda
    if (search) {
      queryBuilder.andWhere('user.name LIKE :search OR user.email LIKE :search', { search: `%${search}%` });
    }

    // Aplicar ordenamiento
    for (const sortRule of sort) {
      const direction = sortRule.desc === 'true' ? 'DESC' : 'ASC';
      queryBuilder.addOrderBy(`user.${sortRule.id}`, direction);
    }

    // Aplicar paginación
    queryBuilder.skip(skip).take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
    };
  }
 */
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
