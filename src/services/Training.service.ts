import { Injectable, NotFoundException } from '@nestjs/common';
import { Instructor, Training } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrainingDto } from '../dtos/create-training.dto';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepo: Repository<Training>,
  ) {
  }

  async create(inputs: CreateTrainingDto): Promise<Training> {
    return this.trainingRepo.save(inputs).then((entity) => this.getWhere('id', (entity as Training).id))
      .catch((error) => Promise.reject(error));
  }

  async get(trainingId: number): Promise<Training> {
    const foundTraining = await this.getWhere('id', trainingId);
    if (!foundTraining) {
      throw new NotFoundException(`Training not fount with id #${trainingId}`);
    }
    return foundTraining;
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Training | null> {
    return this.trainingRepo.findOne({ where: { [key]: value }, relations });
  }
}


