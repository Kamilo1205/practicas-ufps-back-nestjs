import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import * as fs from 'fs';
import * as path from 'path';
import { DecanoService } from 'src/decano/decano.service';
import { Genero } from 'src/common/enums';

@Injectable()
export class DocumentosService {
  constructor(private readonly decanoService: DecanoService) {}
  
  async generateConveioDocument() {
    try {
      const decano = await this.decanoService.findOne();

      const fechaActual = new Date();
      const data = {
        decano_nombre: decano.nombre,
        decano_cedula_numero: decano.numeroDocumento,
        decano_isMasculino: decano.genero == Genero.Masculino,
        decano_isFemenino: decano.genero == Genero.Femenino,
        decano_cedula_lugarExpedicion: decano.lugarExpedicionDocumento,
        dia: fechaActual.getDate(),
        mes: fechaActual.toLocaleString('default', { month: 'long' }),
        anio: fechaActual.getFullYear(),
      };
      
      // Cargar la plantilla del documento
      const templatePath = process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, '..', 'documentos', 'templates', 'template_convenio.docx')
      : path.resolve(__dirname, '..', '..', 'src', 'documentos', 'templates', 'template_convenio.docx');

      const content = fs.readFileSync(templatePath, 'binary');
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);

      // Rellenar la plantilla con los datos
      doc.setData(data);
      doc.render();

      // Generar el documento
      const buf = doc
        .getZip()
        .generate({ type: 'nodebuffer', compression: 'DEFLATE' });

      return buf;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ocurrio un error al tratar de generar el documento');
    }
  }
}
