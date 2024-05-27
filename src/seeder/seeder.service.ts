import { Injectable } from '@nestjs/common';
import { AreaSubAreaInteresService } from 'src/area-sub-area-interes/area-sub-area-interes.service';
import { AreasInteresService } from 'src/areas-interes/areas-interes.service';
import { HerramientasService } from 'src/herramientas/herramientas.service';
import { RolesService } from 'src/roles/roles.service';
import { SubAreasInteresService } from 'src/sub-areas-interes/sub-areas-interes.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
    private readonly areaInteresService: AreasInteresService,
    private readonly subAreasInteresService: SubAreasInteresService,
    private readonly herramientasService: HerramientasService,
    private readonly areaSubAreaService: AreaSubAreaInteresService
  ) {}

  async seed() {
    await this.createRoles();
    await this.createUsuarios();
    await this.createAreasInteres();
  }

  private async createRoles() {
    const roles = await this.rolesService.findAll();
    if (roles.length === 0) {
      const rolesToCreate = [
        { nombre: 'coordinador' },
        { nombre: 'administrador' },
        { nombre: 'empresa' },
        { nombre: 'tutor' },
        { nombre: 'estudiante' },
        { nombre: 'director-programa' },
      ];
      for (const roleData of rolesToCreate) {
        await this.rolesService.create(roleData);
      }
    }
  }

  private async createUsuarios() {
    const usuarios = await this.usuariosService.findAll();
    if (usuarios.total === 0) {
      const coordinadorRole = await this.rolesService.findOneByNombre('coordinador');
      const empresaRole = await this.rolesService.findOneByNombre('empresa');
      const estudianteRole = await this.rolesService.findOneByNombre('estudiante');
      const directorProgramaRole = await this.rolesService.findOneByNombre('director-programa');
      const tutorRole = await this.rolesService.findOneByNombre('tutor');

      const usuariosToCreate = [
        { email: 'coordinador@correo.com', emailConfirmado: new Date(), password: 'coordinador', rolesIds: [coordinadorRole.id], displayName: '', imagenUrl: '', estaActivo: true, estaRegistrado: true },
        { email: 'tutuor@correo.com', emailConfirmado: new Date(), password: 'tutor',  rolesIds: [tutorRole.id], displayName: '', imagenUrl: '', estaActivo: true, estaRegistrado: true },
        { email: 'empresa@correo.com', emailConfirmado: new Date(), password: 'empresa', rolesIds: [empresaRole.id], displayName: '', imagenUrl: '', estaActivo: true, estaRegistrado: true },
        { email: 'estudiante@correo.com', emailConfirmado: new Date(), password: 'estudiante',  rolesIds: [estudianteRole.id], displayName: '', imagenUrl: '', estaActivo: true, estaRegistrado: true },
        { email: 'directorPrograma@correo.com', emailConfirmado: new Date(), password: 'director', rolesIds: [directorProgramaRole.id], displayName: '', imagenUrl: '', estaActivo: true, estaRegistrado: true },
      ];

      for (const usuarioData of usuariosToCreate) {
        await this.usuariosService.create(usuarioData);
      }
    }
  }

  private async createAreasInteres() {
    const areasInteres = await this.areaInteresService.findAll();
    if (areasInteres.length === 0) {
      const areasToCreate = [
        { nombre: 'Mantenimiento de hardware y software' },
        { nombre: 'Mantenimiento y administracion de redes de computadora' },
        { nombre: 'Capacitación' },
        { nombre: 'Desarrollo de sofware (escritorio, movil, web)' },
        { nombre: 'Servidores y computacion en la nube' },
        { nombre: 'Direccion y evaluacion de proyectos' },
        { nombre: 'Inteligencia artificial' }
      ];

      for (const areasData of areasToCreate) {
        await this.areaInteresService.create(areasData);
      }
    }
  }

}
