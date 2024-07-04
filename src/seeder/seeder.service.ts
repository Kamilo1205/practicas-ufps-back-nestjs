import { Injectable } from '@nestjs/common';
import { AreasInteresService } from 'src/areas-interes/areas-interes.service';
import { AreaInteres } from 'src/areas-interes/entities/area-interes.entity';
import { CiudadesService } from 'src/ciudades/ciudades.service';
import { DepartamentosService } from 'src/departamentos/departamentos.service';
import { EpsService } from 'src/eps/eps.service';
import { CreateEstudianteDto } from 'src/estudiantes/dto';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { HerramientasService } from 'src/herramientas/herramientas.service';
import { PaisesService } from 'src/paises/paises.service';
import { RolesService } from 'src/roles/roles.service';
import { TipoAfiliacionEpsService } from 'src/tipo-afiliacion-eps/tipo-afiliacion-eps.service';
import { TipoDocumentoService } from 'src/tipo-documento/tipo-documento.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
    private readonly areaInteresService: AreasInteresService,
    private readonly herramientasService: HerramientasService,
    private readonly estudiantesService: EstudiantesService,
    private readonly paisesService: PaisesService,
    private readonly departamentoService: DepartamentosService,
    private readonly ciudadesService: CiudadesService,
    private readonly epsService: EpsService,
    private readonly tipoDocumentoService: TipoDocumentoService,
    private readonly tipoAfiliacionEpsService: TipoAfiliacionEpsService
  ) {}

  async seed() {
    await this.createRoles();
    await this.createUsuarios();
    await this.createAreasInteres();
    await this.createEstudiante();
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
        { nombre: 'Mantenimiento de hardware y software'},
        { nombre: 'Mantenimiento y administracion de redes de computadora' },
        { nombre: 'Capacitación' },
        { nombre: 'Desarrollo de sofware (escritorio, movil, web)' },
        { nombre: 'Servidores y computacion en la nube' },
        { nombre: 'Direccion y evaluacion de proyectos' },
        { nombre: 'Inteligencia artificial',  },
        { nombre: 'Inteligencia artificial' },
      ];

      for (const areasData of areasToCreate) {
        await this.areaInteresService.create(areasData);
      }
    }
  }

  private async createEstudiante() {
    try {
      const pais = await this.paisesService.create({ nombre: 'Colombia '});
      const departamento = await this.departamentoService.create({ nombre: 'Norte de Santander', paisId: pais.id });
      const ciudad = await this.ciudadesService.create({ nombre: 'Cucuta', departamentoId: departamento.id });
      const nuevaEps = await this.epsService.create({ nit: '147-852-369', nombre: 'Nueva Eps' });
      const tipoDocumento = await this.tipoDocumentoService.create({ nombre: 'Docuemento de Identidad' });
      const tipoAfiliacion = await this.tipoAfiliacionEpsService.create({ nombre: 'Contributivo' });
      
      const usuario = await this.usuariosService.findOneByEmail("estudiante@correo.com");
      await this.estudiantesService.create({
          codigo: 147852,
          direccionResidencia: 'Av 8 # 28 - 107',
          epsId: nuevaEps.id,
          fechaAfiliacionEps: new Date(),
          fechaExpedicionDocumento: new Date(),
          fechaNacimiento: new Date(),
          genero: 'masculino',
          lugarExpedicionDocumentoId: ciudad.id,
          ciudadResidenciaId: ciudad.id,
          numeroDocumento: '1478523690',
          apellidos: 'Leal Diaz',
          nombre: 'Guillermo Duran',
          semestreMatriculado: 9,
          telefono: '+573012859624',
          tipoDocumentoId: tipoDocumento.id,
          grupoMatriculado: 'Grupo A',
          tipoAfiliacionEpsId: tipoAfiliacion.id,
          areasInteres: [],
          herramientas: []
        }, usuario, []);
    } catch (error) {
      console.log(error);
    }
  }

}
