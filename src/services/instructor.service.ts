import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Instructor, User } from '../entities';
import { Repository } from 'typeorm';
import { CreateInstructorDto } from '../dtos/create-instructor.dto';
import { UpdateCourseDto } from '../dtos';
import { UpdateInstructorDto } from '../dtos/update-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(
    @InjectRepository(Instructor)
    private readonly instructorRepo: Repository<Instructor>,
  ) {
  }

  create(inputs: CreateInstructorDto) {
    const newInstructor = new Instructor();
    newInstructor.name = inputs.name;
    newInstructor.surname = inputs.surname;
    newInstructor.title = inputs.title;
    newInstructor.avatar = inputs.avatar;
    newInstructor.bio = inputs.bio;

    return this.instructorRepo.save(newInstructor).then((entity) => this.getWhere('id', entity.id))
      .catch((error) => Promise.reject(error));
  }

  findAll() {
    return `This action returns all course`;
  }

  async get(instructorId: number): Promise<Instructor> {
    const foundInstructor = await this.getWhere('id', instructorId);
    if (!foundInstructor) {
      throw new NotFoundException(`Instructor not fount with id #${instructorId}`);
    }
    return foundInstructor;
  }

  async update(instructorId: number, inputs: UpdateInstructorDto) {
    const foundInstructor = await this.get(instructorId);
    await this.instructorRepo.update(foundInstructor.id, inputs);
    return await this.get(instructorId);
  }

  async remove(instructorId: number) {
    const foundInstructor = await this.get(instructorId);
    await this.instructorRepo.softDelete(foundInstructor.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Instructor | null> {
    return this.instructorRepo.findOne({ where: { [key]: value }, relations });
  }
}
