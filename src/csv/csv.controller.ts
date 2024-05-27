import { Controller, Post, UseInterceptors, BadRequestException, UploadedFile, InternalServerErrorException } from '@nestjs/common';
import { CsvService } from './csv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Post('estudiantes')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { files: 2, fileSize: 1024 * 1024 * 5 },
      fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['text/csv'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
          return cb(new BadRequestException('Tipo de archivo invalido'), false);
        } else if (file.size > 1024 * 1024 * 5 ) {
          return cb(new BadRequestException('Tamaño máximo de archivo alcanzado. Máximo permitido: 1MB'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const response = await this.csvService.readCsvFile(file);
    } catch (error) {
      throw new InternalServerErrorException(error?.message || 'Internal Server Error');
    }
  }

}
