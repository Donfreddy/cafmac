import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from '../entities';
import { Repository } from 'typeorm';
import { CreateReviewDto, UpdateReviewDto } from '../dtos';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {
  }

  async create(course: Course, inputs: CreateReviewDto) {

    const newReview = new Review();
    newReview.content = inputs.content;
    newReview.author = inputs.author;
    newReview.rating = inputs.rating;
    newReview.course = course;
    return this.reviewRepo.save(newReview);
  }

  getAll(): Promise<Review[]> {
    return this.reviewRepo.find();
  }

  async get(reviewId: number): Promise<Review> {
    const foundReview = await this.getWhere('id', reviewId);
    if (!foundReview) {
      throw new NotFoundException(`Review not fount with id #${reviewId}`);
    }
    return foundReview;
  }

  async update(reviewId: number, inputs: UpdateReviewDto) {
    const foundReview = await this.get(reviewId);
    await this.reviewRepo.update(foundReview.id, inputs);
    return await this.get(reviewId);
  }

  async remove(reviewId: number) {
    const foundReview = await this.get(reviewId);
    await this.reviewRepo.softDelete(foundReview.id);
    return { deleted: true };
  }

  async getWhere(key: string, value: any, relations: string[] = []): Promise<Review | null> {
    return this.reviewRepo.findOne({ where: { [key]: value }, relations });
  }
}
