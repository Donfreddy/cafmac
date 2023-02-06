import { Injectable } from '@nestjs/common';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';

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

  async getWhere(key: string, value: any, relations: string[] = []): Promise<User | null> {
    return this.userRepo.findOne({ where: { [key]: value }, relations });
  }
}


