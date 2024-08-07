import { Controller, Get, Patch, Param, ParseUUIDPipe, Body, Delete, Post } from '@nestjs/common';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PlanDeTrabajoService } from './plan-de-trabajo.service';
import { GetUser, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { CreateResultadosDto, UpdatePlanDeTrabajoDto } from './dto';
import { CreateInformeDto } from 'src/informe/dto/create-informe.dto';
import { CreateEvaluacionEstudianteDto } from 'src/evaluacion-estudiante/dto/create-evaluacion-estudiante.dto';

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

  @Patch(':id/aprobacion-tutor-empresarial')
  @Roles(Rol.Tutor)
  async aprobarPorTutorEmpresarial(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.aprobarPorTutorEmpresarial(id, usuario.tutor.id);
  }

  @Patch(':id/aprobacion-tutor-institucional')
  @Roles(Rol.Coordinador)
  async aprobarPorTutorInstitucional(@Param('id', new ParseUUIDPipe()) id: string, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.aprobarPorTutorInstitucional(id, usuario.tutorInstitucional.id);
  }

  @Patch(':id/agregar-resultados')
  @Roles(Rol.Estudiante)
  async agregarResultado(@Param('id', new ParseUUIDPipe()) id: string, @Body() createResultadosDto: CreateResultadosDto) {
    return this.planDeTrabajoService.agregarResultados(id, createResultadosDto);
  }

  @Patch(':id')
  @Roles(Rol.Estudiante)
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updatePlanDeTrabajoDto: UpdatePlanDeTrabajoDto) {
    return this.planDeTrabajoService.update(id, updatePlanDeTrabajoDto);
  }

  @Post('primer-informe')
  @Roles(Rol.Estudiante)
  createPrimerInforme(@Body() createInformeDto: CreateInformeDto, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.createPrimerInforme(createInformeDto, usuario);
  }

  @Post('informe-final')
  @Roles(Rol.Estudiante)
  createInformeFinal(@Body() createInformeDto: CreateInformeDto, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.createInformeFinal(createInformeDto, usuario);
  }

  @Post('evaluacion-estudiante')
  @Roles(Rol.Estudiante)
  createEvaluacionEstudiante(@Body() createEvaluacionEstudianteDto: CreateEvaluacionEstudianteDto, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.createEvaluacionEstudiante(createEvaluacionEstudianteDto, usuario);
  }

  @Patch('evaluacion-estudiante/:evaluacionId')
  @Roles(Rol.Estudiante)
  updateEvaluacionEstudiante(@Param('evaluacionId', new ParseUUIDPipe()) evaluacionId: string, @Body() createEvaluacionEstudianteDto: CreateEvaluacionEstudianteDto, @GetUser() usuario: Usuario) {
    return this.planDeTrabajoService.updateEvaluacionEstudiante(evaluacionId, createEvaluacionEstudianteDto, usuario);
  }
}
