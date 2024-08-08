import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class GoogleDriveService {
  private drive: drive_v3.Drive;

  constructor(private configService: ConfigService) {
    const GOOGLE_CLIENT_ID: string = this.configService.get('GOOGLE_CLIENT_ID');
    const GOOGLE_CLIENT_SECRET: string = this.configService.get('GOOGLE_CLIENT_SECRET');
    const GOOGLE_REDIRECT_URI: string = this.configService.get('GOOGLE_REDIRECT_URI');
    const GOOGLE_REFRESH_TOKEN: string = this.configService.get('GOOGLE_REFRESH_TOKEN');

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI || !GOOGLE_REFRESH_TOKEN) {
      throw new InternalServerErrorException('Google API credentials are not configured properly.');
    }

    const auth = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
    auth.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    this.drive = google.drive({ version: 'v3', auth });
  }

  /**
   * Subir un archivo en Google Drive.
   * @param fileMetadata Metadatos del archivo.
   * @param media Contenido del archivo.
   * @returns ID del archivo creado.
   */
  async uploadFile(name: string, parents: string[], file: Express.Multer.File, options?: any): Promise<string> {
    try {
      const requestBody = { name, parents };
      const media = { mimeType: file.mimetype, body: Readable.from(file.buffer)}
      const response = await this.drive.files.create({ requestBody, media });
      return response.data.id;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear el archivo en Google Drive.');
    }
  }

  /**
   * Subir y reemplazar un archivo en Google Drive.
   * @param name Nombre del archivo.
   * @param parents ID de la(s) carpeta(s) principal(es).
   * @param file Archivo a subir.
   * @param options Opciones adicionales.
   * @returns ID del archivo creado.
   */
  async uploadAndReplaceFile(name: string, parents: string[], file: Express.Multer.File, options?: any): Promise<string> {
    try {
      // Buscar archivo existente
      const existingFiles = await this.drive.files.list({
        q: `name='${name}' and '${parents[0]}' in parents and trashed=false`,
        fields: 'files(id, name)',
      });

      // Si existe el archivo, eliminarlo
      if (existingFiles.data.files.length > 0) {
        await Promise.all(existingFiles.data.files.map(file => this.deleteFile(file.id)));
      }

      // Subir el nuevo archivo
      const requestBody = { name, parents };
      const media = { mimeType: file.mimetype, body: Readable.from(file.buffer) };
      const response = await this.drive.files.create({ requestBody, media });

      return response.data.id;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('No se pudo crear o reemplazar el archivo en Google Drive.');
    }
  }

  /**
   * Busca archivos en Google Drive.
   * @param query Consulta de búsqueda.
   * @returns Lista de archivos que coinciden con la consulta.
   */
  async searchFiles(query: string): Promise<drive_v3.Schema$File[]> {
    try {
      const response = await this.drive.files.list({
        q: query,
      });

      return response.data.files;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo realizar la búsqueda en Google Drive.');
    }
  }

  /**
   * Elimina un archivo en Google Drive.
   * @param fileId ID del archivo a eliminar.
   */
  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId,
      });
    } catch (error) {
      throw new InternalServerErrorException('No se pudo eliminar el archivo en Google Drive.');
    }
  }

  /**
   * Crea una carpeta en Google Drive.
   * @param folderName Nombre de la carpeta a crear.
   * @param parentFolderId ID de la carpeta principal.
   * @returns ID de la carpeta creada.
   */
  async createFolder(folderName: string, parentFolderId?: string): Promise<string> {
    try {
      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentFolderId ? [parentFolderId] : [],
      };

      const response = await this.drive.files.create({
        requestBody: folderMetadata,
      });

      return response.data.id;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo crear la carpeta en Google Drive.');
    }
  }

  async findFolder(folderName: string, parentFolderId?: string) {
    const query = `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`;
    try {
      const res = await this.drive.files.list({
        q: parentFolderId ? `${query} and '${parentFolderId}' in parents` : query,
        fields: 'files(id, name)',
        spaces: 'drive',
      });
      return res.data.files.length > 0 ? res.data.files[0].id : null;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo buscar la carpeta en Google Drive.');
    }
  }

  /**
   * Crea una carpeta en Google Drive.
   * @param folderName Nombre de la carpeta a crear.
   * @param parentFolderId ID de la carpeta principal.
   * @returns ID de la carpeta creada.
   */
  async createFolderIfNotExist(folderName: string, parentFolderId?: string) {
    const folderId = await this.findFolder(folderName, parentFolderId);
    if (folderId) return folderId;
    return this.createFolder(folderName, parentFolderId);
  }

  /**
   * Busca carpetas en Google Drive.
   * @param folderName Nombre de la carpeta a buscar.
   * @param parentFolderId ID de la carpeta principal.
   * @returns Lista de carpetas que coinciden con la búsqueda.
   */
  async searchFolders(folderName: string, parentFolderId: string): Promise<drive_v3.Schema$File[]> {
    try {
      const response = await this.drive.files.list({
        q: `'${parentFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
      });
      return response.data.files;
    } catch (error) {
      throw new InternalServerErrorException('No se pudo realizar la búsqueda de carpetas en Google Drive.');
    }
  }

  async renameFolder(folderId: string, newName: string): Promise<void> {
    try {
      const folderMetadata = { name: newName };
      await this.drive.files.update({
        fileId: folderId,
        requestBody: folderMetadata,
      });
    } catch (error) {
      throw new InternalServerErrorException('No se pudo cambiar el nombre de la carpeta en Google Drive.');
    }
  }
  
  async renameFile(fileId: string, newName: string): Promise<void> {
    try {
      const fileMetadata = { name: newName };
      await this.drive.files.update({
        fileId: fileId,
        requestBody: fileMetadata,
      });
    } catch (error) {
      throw new InternalServerErrorException('No se pudo cambiar el nombre del archivo en Google Drive.');
    }
  }

  /**
   * Recupera un archivo desde Google Drive.
   * @param fileId ID del archivo a recuperar.
   * @returns Contenido del archivo como un flujo de datos.
   */
  async getFileFromDrive(fileId: string): Promise<any> {
    try {
      const { data: { name } } = await this.drive.files.get({
        fileId: fileId,
        fields: 'name',
      });

      const response = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, { responseType: 'stream' });

      const filename = name;
      const mimeType = response.headers['content-type'];
      const stream = response.data as Readable;
      
      return { stream, filename, mimeType };
    } catch (error) {
      throw new InternalServerErrorException('No se pudo recuperar el archivo desde Google Drive.');
    }
  }
}
