import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from './google-drive.service';
import { Public, Roles } from 'src/auth/decorators';
import { Rol } from 'src/auth/enums/rol.enum';
import { Readable } from 'stream';

@Controller('google-drive')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToDrive(@UploadedFile() file: Express.Multer.File) {
    if (!file)
      throw new HttpException(
        'El archivo es requerido',
        HttpStatus.BAD_REQUEST,
      );

    try {
      const fileMetadata = {
        name: file.originalname,
        // parents: [studentFolderId],
        public: false,
      };

      const media = {
        mimeType: file.mimetype,
        body: Readable.from(file.buffer),
      };

      const response = await this.googleDriveService.uploadFile(
        fileMetadata,
        media,
      );
      return { message: 'Archivo cargado exitosamente', fileId: response };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'No se pudo cargar el archivo',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
