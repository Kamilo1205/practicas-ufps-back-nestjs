import { Controller, Get, Res } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { Response } from 'express';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Get('/convenio')
  async generarConvenio(@Res() res: Response) {
    try {
      const documentoBuffer = await this.documentosService.generateConveioDocument();
      res.set({
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="convenio.docx"',
      });
      res.send(documentoBuffer);
    } catch (error) {
      res.status(500).send('Error al generar el documento');
    }
  }
}
