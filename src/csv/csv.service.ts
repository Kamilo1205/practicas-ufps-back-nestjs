import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { Rol } from 'src/auth/enums';
import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { GrupoPracticasService } from 'src/grupo-practicas/grupo-practicas.service';
import { RolesService } from 'src/roles/roles.service';
import { SemestreService } from 'src/semestre/semestre.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CsvService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly grupoPracticasService: GrupoPracticasService,
    private readonly estudiantesService: EstudiantesService,
  ) {}

  async readCsvFile(grupoId: string, file: Express.Multer.File) {
    const csvContent: Buffer = file.buffer;
    const parsedData: any = await new Promise((resolve, reject) => {
      parse(
        csvContent, {
          columns: false,          // Mantén esto en false si no hay encabezados
          relax_quotes: true,      // Permite comillas flexibles
          skip_empty_lines: true,  // Omite líneas vacías
          trim: true               // Recorta espacios en blanco alrededor de las entradas
        }, (err, records) => {
        if (err) { 
          return reject(err);
        }
        resolve(records);
      });
    });
    
    const grupoPractica = await this.grupoPracticasService.findOne(grupoId);
    for await (const email of parsedData[0]) {
      let usuario: Usuario = await this.usuariosService.findOneByEmail(email);
      let estudiante = null;
      if (usuario) {
        await this.usuariosService.update(usuario.id, { estaActivo: true });;
        await this.estudiantesService.agregarEstudianteASemestre(usuario.estudiante.id); 
      } else {
        usuario = await this.usuariosService.createEstudiante(email);
        estudiante = await this.estudiantesService.createEstudiante(usuario, grupoPractica);
      } 
      console.log(usuario);
    }
  }
}
