import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto, UpdateCourseDto } from '../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Course, Instructor } from '../entities';
import { Repository } from 'typeorm';
import { SlugProvider } from '../providers/slug.provider';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CreateReviewDto } from '../dtos/create-review.dto';
import * as _ from 'lodash';
import { Review } from '../entities/review.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Instructor)
    private readonly instructorRepo: Repository<Instructor>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    private readonly slug: SlugProvider,
  ) {
  }

  async create(inputs: CreateCourseDto) {
    const newCourse = new Course();
    newCourse.title = inputs.title;
    newCourse.slug = this.slug.slugify(inputs.title);
    newCourse.description = inputs.description;
    newCourse.duration = inputs.duration;
    newCourse.prerequisites = inputs.prerequisites;
    newCourse.kpi = inputs.kpi;
    newCourse.objectives = inputs.objectives;

    return this.courseRepo.save(newCourse).then((entity) => this.getWhere('id', entity.id))
      .catch((error) => Promise.reject(error));
  }

  getAll(options: IPaginationOptions): Promise<Pagination<Course>> {
    return paginate<Course>(this.courseRepo, options);
  }

  async get(courseSlug: string): Promise<Course> {
    const foundCourse = await this.getWhere('slug', courseSlug);
    if (!foundCourse) {
      throw new NotFoundException(`Course not fount with slug ${courseSlug}`);
    }
    return foundCourse;
  }

  async update(blogSlug: string, inputs: UpdateCourseDto) {
    const foundCourse = await this.get(blogSlug);
    await this.courseRepo.update(foundCourse.id, inputs);
    return await this.get(blogSlug);
  }

  async remove(blogSlug: string) {
    const foundCourse = await this.get(blogSlug);
    await this.courseRepo.softDelete(foundCourse.id);
    return { deleted: true };
  }

  async postReview(blogSlug: string, inputs: CreateReviewDto) {
    const foundCourse = await this.get(blogSlug);

    const newReview = new Review();
    newReview.content = inputs.content;
    newReview.author = inputs.author;
    newReview.rating = inputs.rating;
    newReview.course = foundCourse;
    await this.reviewRepo.save(newReview);

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
    console.log(foundCourse);
    await this.courseRepo.save(foundCourse);

    return { review: _.pick(newReview, ['id', 'content', 'author', 'rating']) };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Course | null> {
    return this.courseRepo.findOne({ where: { [key]: value }, relations });
  }
}
