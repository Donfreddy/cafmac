import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from '../entities';
import { Repository } from 'typeorm';
import { SlugProvider } from '../providers/slug.provider';
import { CreateInstructorDto, UpdateInstructorDto } from '../dtos';
import { getImageUrl, slugOrIdWhereCondition } from '../common/helpers';
import { LocalFileDto } from '../dtos/local-file.dto';
import { LocalFileService } from './local-file.service';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepo: Repository<Instructor>,
    private localFile: LocalFileService,
    private readonly slug: SlugProvider,
  ) {
  }

  async create(inputs: CreateInstructorDto, fileData: LocalFileDto) {
    // save file
    await this.localFile.saveLocalFileData(fileData);

    const newInstructor = new Instructor();
    newInstructor.name = inputs.name;
    newInstructor.slug = this.slug.slugify(inputs.name + inputs.surname);
    newInstructor.surname = inputs.surname;
    newInstructor.title = inputs.title;
    newInstructor.telephone = inputs.telephone;
    newInstructor.avatar = getImageUrl(fileData.filename);
    newInstructor.bio = inputs.bio;

    return this.instructorRepo.save(newInstructor).then((entity) => this.getWhere('id', entity.id))
      .catch((error) => Promise.reject(error));
  }

  getAll(): Promise<Instructor[]> {
    return this.instructorRepo.find();
  }

  async get(instructorSlug: string): Promise<Instructor> {
    const foundInstructor = await this.instructorRepo.findOne({
      where: slugOrIdWhereCondition(instructorSlug),
    });
    if (!foundInstructor) {
      throw new NotFoundException(`Instructor not fount with slug ${instructorSlug}`);
    }
    return foundInstructor;
  }

  async update(instructorSlug: string, inputs: UpdateInstructorDto) {
    const foundInstructor = await this.get(instructorSlug);
    //  await this.instructorRepo.update(foundInstructor.id, inputs);
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
