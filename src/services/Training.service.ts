import { Injectable, NotFoundException } from '@nestjs/common';
import { Training } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingDto, UpdateTrainingDto } from '../dtos';
import { SlugProvider } from '../providers/slug.provider';
import { getImageUrl, slugOrIdWhereCondition } from '../common/helpers';
import { LocalFileDto } from '../dtos/local-file.dto';
import { LocalFileService } from './local-file.service';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepo: Repository<Training>,
    private localFile: LocalFileService,
    private readonly slug: SlugProvider,
  ) {
  }

  async create(inputs: CreateTrainingDto, fileData: LocalFileDto): Promise<Training> {
    // save file
    await this.localFile.saveLocalFileData(fileData);

    const newTraining = new Training();
    newTraining.title = inputs.title;
    newTraining.banner = getImageUrl(fileData.filename);
    newTraining.slug = this.slug.slugify(inputs.title);

    return this.trainingRepo.save(newTraining).then((entity) => this.getWhere('id', (entity as Training).id))
      .catch((error) => Promise.reject(error));
  }

  getAll(): Promise<Training[]> {
    return this.trainingRepo.find();
  }

  async get(trainingSlug: string): Promise<Training> {
    const foundTraining = await this.trainingRepo.findOne({
      where: slugOrIdWhereCondition(trainingSlug),
    });
    if (!foundTraining) {
      throw new NotFoundException(`Training not fount with slug ${trainingSlug}`);
    }
    return foundTraining;
  }

  async update(trainingSlug: string, inputs: UpdateTrainingDto) {
    const module = await this.get(trainingSlug);
    // await this.trainingRepo.update(module.id, inputs);
    return await this.get(trainingSlug);
  }

  async remove(trainingSlug: string) {
    const appDomain = await this.get(trainingSlug);
    await this.trainingRepo.softDelete(appDomain.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Training | null> {
    return this.trainingRepo.findOne({ where: { [key]: value }, relations });
  }
}


