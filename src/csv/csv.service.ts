import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class CsvService {
  constructor(private usuariosService: UsuariosService) {}

  async readCsvFile(file: Express.Multer.File) {
    const csvContent: Buffer = file.buffer;
    const parsedData: any = await new Promise((resolve, reject) => {
      parse(
        csvContent, {
          columns: false,
          relax_quotes: true,
          skip_empty_lines: true,
          cast: true
        }, (err, records) => {
        if (err) { 
          return reject(err);
        }
        resolve(records);
      });
    });
    
    for await (const email of parsedData[0]) {
      let usuario: Usuario = await this.usuariosService.findOneByEmail(email);
      if (usuario) {
        await this.usuariosService.update(usuario.id, { estaActivo: true });
        
      } else {
        usuario = await this.usuariosService.create({
          email,
          password: null,
          imagenUrl: null,
          displayName: null,
          estaActivo: true,
          emailConfirmado: undefined,
          estaRegistrado: false,
          rolesIds: []
        });
      }
      console.log(usuario);
    }
  }
}
