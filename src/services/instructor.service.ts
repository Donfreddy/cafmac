import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from '../entities';
import { Repository } from 'typeorm';
import { SlugProvider } from '../providers/slug.provider';
import { CreateInstructorDto, UpdateInstructorDto } from '../dtos';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepo: Repository<Instructor>,
    private readonly slug: SlugProvider,
  ) {
  }

  create(inputs: CreateInstructorDto) {
    const newInstructor = new Instructor();
    newInstructor.name = inputs.name;
    newInstructor.slug = this.slug.slugify(inputs.name + inputs.surname);
    newInstructor.surname = inputs.surname;
    newInstructor.title = inputs.title;
    newInstructor.telephone = inputs.telephone;
    newInstructor.avatar = inputs.avatar;
    newInstructor.bio = inputs.bio;

    return this.instructorRepo.save(newInstructor).then((entity) => this.getWhere('slug', entity.slug))
      .catch((error) => Promise.reject(error));
  }

  getAll() {
    return this.instructorRepo.find();
  }

  async get(instructorSlug: string): Promise<Instructor> {
    const foundInstructor = await this.getWhere('slug', instructorSlug);
    if (!foundInstructor) {
      throw new NotFoundException(`Instructor not fount with slug ${instructorSlug}`);
    }
    return foundInstructor;
  }

  async update(instructorSlug: string, inputs: UpdateInstructorDto) {
    const foundInstructor = await this.get(instructorSlug);
    await this.instructorRepo.update(foundInstructor.id, inputs);
    return await this.get(instructorSlug);
  }

  async remove(instructorSlug: string) {
    const foundInstructor = await this.get(instructorSlug);
    await this.instructorRepo.softDelete(foundInstructor.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Instructor | null> {
    return this.instructorRepo.findOne({ where: { [key]: value }, relations });
  }
}
