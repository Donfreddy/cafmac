import { Injectable, NotFoundException } from '@nestjs/common';
import { Instructor, User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModuleDto } from '../dtos/create-module.dto';
import { Module } from '../entities/module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepo: Repository<Module>,
  ) {
  }

  async create(inputs: CreateModuleDto): Promise<Module> {
    return this.moduleRepo.save(inputs).then((entity) => this.getWhere('id', (entity as Module).id))
      .catch((error) => Promise.reject(error));
  }

  async get(moduleId: number): Promise<Module>{
    const foundModule= await this.getWhere('id', moduleId);
    if (!foundModule) {
      throw new NotFoundException(`Module not fount with id #${moduleId}`);
    }
    return foundModule;
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Module | null> {
    return this.moduleRepo.findOne({ where: { [key]: value }, relations });
  }
}
