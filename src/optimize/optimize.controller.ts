import { Controller, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

import { buffer } from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

import { Readable } from 'stream';
import * as AdmZip from 'adm-zip';

@Controller('optimize')
export class OptimizeController {
  @Post('image')
  @UseInterceptors(AnyFilesInterceptor())
  async addAvatar(@Res() response: Response, @UploadedFiles() files: Express.Multer.File[]) {

    const zip = new AdmZip();

    for(const file of files) {
      const optimizedFile = await buffer(file.buffer, {
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      })

      zip.addFile(file.originalname, optimizedFile);
    }
    const stream = Readable.from(zip.toBuffer());

    stream.pipe(response);
  }
}
