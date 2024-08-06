import { Controller, Get, Patch, Param, ParseUUIDPipe, Body, Delete } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PlanDeTrabajoService } from './plan-de-trabajo.service';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateResultadoDto, CreateResultadosDto, UpdatePlanDeTrabajoDto, UpdateResultadoDto } from './dto';

@Controller('plan-trabajo')
export class PlanDeTrabajoController {
  constructor(private readonly planDeTrabajoService: PlanDeTrabajoService) {}

  @Get()
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAll(@Paginate() query: PaginateQuery) {
    return this.planDeTrabajoService.findAll(query);
  }

  @Get('actual')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findAllSemestreActual() {
    return this.planDeTrabajoService.findAllSemestreActual();
  }

  @Get(':id')
  @Roles(Rol.Coordinador, Rol.Administrador)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planDeTrabajoService.findOne(id);
  }
  
  @Get('estudiante/mis-planes')
  @Roles(Rol.Estudiante)
  findAllByEstudiante(@GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.findAllByEstudiante(usuario);
  }

  @Get('estudiante/mi-plan/actual')
  @Roles(Rol.Estudiante)
  findByEstudianteActual(@GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.findOneByEstudianteBySemestreActual(usuario);
  }
  
  @Get('estudiante/mi-plan/:id')
  @Roles(Rol.Estudiante)
  findOneByEstudiante(@GetUser() usuario: Usuario, @Param('id', new ParseUUIDPipe()) id: string) {
    return this.planDeTrabajoService.findOneByEstudiante(id, usuario);
  }

  @Patch('actualizar-resultado/:id')
  @Roles(Rol.Tutor)
  async updateResultado(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateResultadoDto: UpdateResultadoDto) {
    return this.planDeTrabajoService.updateResultado(id, updateResultadoDto);
  }

  @Patch(':id/aprobacion-tutor-empresarial')
  @Roles(Rol.Coordinador)
  async aprobarPorTutorEmpresarial(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.aprobarPorTutorEmpresarial(id, usuario.tutor.id);
  }

  @Patch(':id/aprobacion-tutor-institucional')
  @Roles(Rol.Tutor)
  async aprobarPorTutorInstitucional(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.aprobarPorTutorInstitucional(id, usuario.tutorInstitucional.id);
  }

  @Patch(':id/agregar-resultado')
  @Roles(Rol.Tutor)
  async agregarResultado(@Param('id', new ParseUUIDPipe()) id: string, @Body() createResultadosDto: CreateResultadosDto) {
    return this.planDeTrabajoService.agregarResultados(id, createResultadosDto);
  }

  @Delete('eliminar-resultado/:id')
  @Roles(Rol.Tutor)
  async eliminarResultado(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.planDeTrabajoService.eliminarResultados(id);
  }

  @Patch(':id')
  @Roles(Rol.Tutor)
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updatePlanDeTrabajoDto: UpdatePlanDeTrabajoDto) {
    return this.planDeTrabajoService.update(id, updatePlanDeTrabajoDto);
  }
}
