import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
  }

  async create(inputs: CreateUserDto): Promise<User> {
    return this.userRepo.save(inputs).then((entity) => this.getWhere('id', (entity as User).id))
      .catch((error) => Promise.reject(error));
  }

  async get(userId: number): Promise<User> {
    const foundUser = await this.getWhere('id', userId);
    if (!foundUser) {
      throw new NotFoundException(`User not fount with id #${userId}`);
    }
    return foundUser;
  }

  async update(userId: number, inputs: UpdateUserDto) {
    const appDomain = await this.get(userId);
    await this.userRepo.update(appDomain.id, inputs);
    return await this.get(userId);
  }

  async remove(appDomainId: number) {
    const appDomain = await this.get(appDomainId);
    await this.userRepo.softDelete(appDomain.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<User | null> {
    return this.userRepo.findOne({ where: { [key]: value }, relations });
  }
}


