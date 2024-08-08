import { Injectable } from '@nestjs/common';
import { parse } from 'papaparse';

import { EstudiantesService } from 'src/estudiantes/estudiantes.service';
import { GrupoPracticasService } from 'src/grupo-practicas/grupo-practicas.service';
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
    const csvContent: string = file.buffer.toString();
    const result = parse(csvContent, { header: false });
    const emails = [...new Set(result.data.map((row: string[]) => row[0]))]; 

    const grupoPractica = await this.grupoPracticasService.findOne(grupoId);

    const promises = emails.map(async (email: string) => {
      let usuario: Usuario = await this.usuariosService.findOneByEmail(email);
      let estudiante = null;

      if (usuario) {
        await this.usuariosService.update(usuario.id, { estaActivo: true });
      
        if (usuario.estudiante) await this.estudiantesService.agregarEstudianteASemestre(usuario.estudiante.id, grupoPractica);
        else await this.estudiantesService.createEstudiante(usuario, grupoPractica);  
      } else {
        usuario = await this.usuariosService.createEstudiante(email);
        estudiante = await this.estudiantesService.createEstudiante(usuario, grupoPractica);
      }
    });

    const results = await Promise.allSettled(promises);
    console.log(results);
  }
}
