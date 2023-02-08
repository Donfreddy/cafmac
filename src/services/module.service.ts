import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModuleDto, UpdateModuleDto } from '../dtos';
import { Module } from '../entities/module.entity';
import { AppDomainService } from './app-domain.service';
import { SlugProvider } from '../providers/slug.provider';
import { Course } from '../entities';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepo: Repository<Module>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    private readonly appDomain: AppDomainService,
    private readonly slug: SlugProvider,
  ) {
  }

  async create(inputs: CreateModuleDto): Promise<Module> {
    const appDomainList: string[] = [];

    const foundCourse = await this.courseRepo.findOne({ where: { slug: inputs.course_slug } });
    if (!foundCourse) {
      throw new NotFoundException(`Course not fount with slug ${inputs.course_slug}`);
    }

    await Promise.all(inputs.app_domains.map(async (id) => {
      const foundAppDomain = await this.appDomain.get(id);
      appDomainList.push(foundAppDomain.name);
    }));

    const newModule = new Module();
    newModule.title = inputs.title;
    newModule.slug = this.slug.slugify(inputs.title);
    newModule.course = foundCourse;
    newModule.AppDomain = appDomainList;

    // update course
    foundCourse.module_count += 1;
    await this.courseRepo.save(foundCourse);

    return this.moduleRepo.save(newModule).then((entity) => this.getWhere('id', (entity as Module).id))
      .catch((error) => Promise.reject(error));
  }

  getAll(): Promise<Module[]> {
    return this.moduleRepo.find();
  }

  async get(moduleSlug: string): Promise<Module> {
    const foundModule = await this.getWhere('slug', moduleSlug);
    if (!foundModule) {
      throw new NotFoundException(`Module not fount with slug ${moduleSlug}`);
    }
    return foundModule;
  }

  async update(moduleSlug: string, inputs: UpdateModuleDto) {
    const module = await this.get(moduleSlug);
    await this.moduleRepo.update(module.id, inputs);
    return await this.get(moduleSlug);
  }

  async remove(moduleSlug: string) {
    const appDomain = await this.get(moduleSlug);
    await this.moduleRepo.softDelete(appDomain.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Module | null> {
    return this.moduleRepo.findOne({ where: { [key]: value }, relations });
  }
}
