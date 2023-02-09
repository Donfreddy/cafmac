import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalFileDto } from '../dtos/local-file.dto';
import { LocalFile } from '../entities/local-file.entity';

@Injectable()
export class LocalFileService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {
  }

  async saveLocalFileData(fileData: LocalFileDto): Promise<LocalFile> {
    const newFile = this.localFilesRepository.create(fileData);
    await this.localFilesRepository.save(newFile);
    return newFile;
  }

  async getFileByName(filename: string): Promise<LocalFile> {
    const file = await this.localFilesRepository.findOne({ where: { filename } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
