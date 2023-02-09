import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { configService } from '../../config/config.service';
import { generateUniqueKey, getFileExtension } from '../helpers';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor() {
      const filesDestination = configService.getFileDestination();
      const destination = `public/${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename(_, file: Express.Multer.File, cb: (error: (Error | null), filename: string) => void) {
            cb(null,  `${generateUniqueKey()}.${getFileExtension(file.originalname)}`);
          },

        }),
        fileFilter: options.fileFilter,
        limits: options.limits
      };
      this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions));
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }

  return mixin(Interceptor);
}

export default LocalFilesInterceptor;