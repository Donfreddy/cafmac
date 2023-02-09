import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, CreateReviewDto, UpdateCourseDto } from '../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Instructor } from '../entities';
import { Repository } from 'typeorm';
import { SlugProvider } from '../providers/slug.provider';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import * as _ from 'lodash';
import { Review } from '../entities/review.entity';
import { ReviewService } from './review.service';
import { TrainingService } from './Training.service';
import { InstructorService } from './instructor.service';
import { Module } from '../entities/module.entity';
import { slugOrIdWhereCondition } from '../common/helpers';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Module)
    private readonly moduleRepo: Repository<Module>,
    @InjectRepository(Instructor)
    private readonly instructorRepo: Repository<Instructor>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    private readonly review: ReviewService,
    private readonly training: TrainingService,
    private readonly instructor: InstructorService,
    private readonly slug: SlugProvider,
  ) {
  }

  async create(inputs: CreateCourseDto) {
    const instructorsList: Instructor[] = [];
    const fountTraining = await this.training.get(inputs.training_slug);

    await Promise.all(inputs.instructors.map(async (id) => {
      const foundInstructor = await this.instructor.getWhere('id', id);
      if (!foundInstructor) {
        throw new NotFoundException(`Instructor not fount with id #${id}`);
      }
      instructorsList.push(foundInstructor);
    }));

    const newCourse = new Course();
    newCourse.title = inputs.title;
    newCourse.slug = this.slug.slugify(inputs.title);
    newCourse.description = inputs.description;
    newCourse.duration = inputs.duration;
    newCourse.prerequisites = inputs.prerequisites;
    newCourse.kpi = inputs.kpi;
    newCourse.objectives = inputs.objectives;
    newCourse.training = fountTraining;
    newCourse.instructors = instructorsList;
    newCourse.graduates = inputs.graduates;
    newCourse.instructor_count = instructorsList.length;

    return this.courseRepo.save(newCourse).then((entity) => this.getWhere('id', entity.id))
      .catch((error) => Promise.reject(error));
  }

  getAll(): Promise<any> {
    return this.courseRepo.find({
      select: ['id', 'slug', 'description', 'vote_average', 'module_count', 'instructor_count'],
    });
    // return paginate<Course>(this.courseRepo, options, {
    //   select: ['id', 'slug', 'description', 'vote_average', 'module_count', 'instructor_count'],
    // });
  }

  async get(courseSlug: string, relations: string[] = []): Promise<Course> {
    const foundCourse = await this.courseRepo.findOne({
      where: slugOrIdWhereCondition(courseSlug),
      relations: relations,
    });
    if (!foundCourse) {
      throw new NotFoundException(`Course not fount with slug ${courseSlug}`);
    }
    return foundCourse;
  }


  async getOne(courseSlug: string): Promise<any> {
    const foundCourse = await this.courseRepo.findOne({
      where: slugOrIdWhereCondition(courseSlug),
      relations: {
        reviews: true,
        instructors: true,
      },
    });
    if (!foundCourse) {
      throw new NotFoundException(`Course not fount with slug ${courseSlug}`);
    }

    const foundModule = await this.moduleRepo.find({
      where: { course: { slug: foundCourse.slug } },
    });

    const result: any = {
      ...foundCourse,
    };
    result.modules = foundModule;

    return result;
  }

  async update(blogSlug: string, inputs: UpdateCourseDto) {
    const foundCourse = await this.get(blogSlug);
    const instructors: Instructor[] = [];
    const fountTraining = await this.training.get(inputs.training_slug);

    await Promise.all(inputs.instructors.map(async (id) => {
      const foundInstructor = await this.instructor.getWhere('id', id);
      if (!foundInstructor) {
        throw new NotFoundException(`Instructor not fount with id #${id}`);
      }
      instructors.push(foundInstructor);
    }));

    if (inputs.title) foundCourse.title = inputs.title;
    if (inputs.description) foundCourse.description = inputs.description;
    if (inputs.description) foundCourse.duration = inputs.duration;
    if (inputs.prerequisites) foundCourse.prerequisites = inputs.prerequisites;
    if (inputs.kpi) foundCourse.kpi = inputs.kpi;
    if (inputs.objectives) foundCourse.objectives = inputs.objectives;
    if (inputs.training_slug) foundCourse.training = fountTraining;
    if (inputs.instructors) foundCourse.instructors = instructors;
    if (inputs.graduates) foundCourse.graduates = inputs.graduates;
    await this.courseRepo.update(module.id, foundCourse);
    return await this.get(blogSlug);
  }

  async remove(blogSlug: string) {
    const foundCourse = await this.get(blogSlug);
    await this.courseRepo.softDelete(foundCourse.id);
    return { deleted: true };
  }

  async postReview(blogSlug: string, inputs: CreateReviewDto) {
    const foundCourse = await this.get(blogSlug);

    const createReview = await this.review.create(foundCourse, inputs);

    // get all rating from course
    const reviews = await this.get(blogSlug).then((c) => {
      return c.reviews;
    });

    let totalReviews = 0;
    await Promise.all(reviews.map((r) => {
      console.log(parseFloat(r.rating));
      totalReviews += parseFloat(r.rating);
    }));

    // update vote average
    foundCourse.vote_average = totalReviews / reviews.length;
    await this.courseRepo.save(foundCourse);

    return { review: _.pick(createReview, ['id', 'content', 'author', 'rating']) };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Course | null> {
    return this.courseRepo.findOne({ where: { [key]: value }, relations });
  }
}
