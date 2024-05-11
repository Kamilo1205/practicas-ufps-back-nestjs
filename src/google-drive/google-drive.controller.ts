import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleDriveService } from './google-drive.service';
import { Public, Roles } from 'src/auth/decorators';

@Controller('google-drive')
export class GoogleDriveController {
  constructor(private readonly googleDriveService: GoogleDriveService) {}

  @Post('upload')
  @Public()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToDrive(@UploadedFile() file: Express.Multer.File) {
    this.googleDriveService.uploadFile(file.filename, [], file);
  }

  @Get(':fileId')
  async getFile(@Param('fileId') fileId: string, @Res() res): Promise<any> {
    try {
      const { stream, filename, mimeType } = await this.googleDriveService.getFileFromDrive(fileId);
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      stream.pipe(res);
    } catch (error) {
      console.log('Ocurrio un error');
      console.log(error);
      throw new NotFoundException('Archivo no encontrado');
    }
  }
}
