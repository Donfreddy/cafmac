import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppDomain } from '../entities';
import { CreateAppDomainDto, UpdateAppDomainDto } from '../dtos/app-domain.dto';

@Injectable()
export class AppDomainService {
  constructor(
    @InjectRepository(AppDomain)
    private readonly appDomainRepo: Repository<AppDomain>,
  ) {
  }

  async create(inputs: CreateAppDomainDto): Promise<AppDomain> {
    return this.appDomainRepo.save(inputs).then((entity) => this.getWhere('id', (entity as AppDomain).id))
      .catch((error) => Promise.reject(error));
  }

  getAll(): Promise<AppDomain[]> {
    return this.appDomainRepo.find();
  }

  async get(appDomainId: number): Promise<AppDomain> {
    const foundAppDomain = await this.getWhere('id', appDomainId);
    if (!foundAppDomain) {
      throw new NotFoundException(`App Domain not fount with id #${foundAppDomain}`);
    }
    return foundAppDomain;
  }

  async update(appDomainId: number, inputs: UpdateAppDomainDto) {
    const appDomain = await this.get(appDomainId);
    await this.appDomainRepo.update(appDomain.id, inputs);
    return await this.get(appDomainId);
  }

  async remove(appDomainId: number) {
    const appDomain = await this.get(appDomainId);
    await this.appDomainRepo.softDelete(appDomain.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any): Promise<AppDomain | null> {
    return this.appDomainRepo.findOne({ where: { [key]: value } });
  }
}
