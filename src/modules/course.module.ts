import { Module } from '@nestjs/common';
import { CourseService } from '../services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDomain, Course, Instructor, Training } from '../entities';
import {
  AppDomainController,
  CourseController,
  InstructorController,
  TrainingController,
  ModuleController,
} from '../controllers';
import { SlugProvider } from '../providers/slug.provider';
import { InstructorService } from '../services/instructor.service';
import { Review } from '../entities/review.entity';
import { ModuleService } from '../services/module.service';
import { TrainingService } from '../services/Training.service';
import { Module as M } from '../entities/module.entity';
import { AppDomainService } from '../services/app-domain.service';
import { ReviewController } from '../controllers/review.controller';
import { ReviewService } from '../services/review.service';
import { LocalFileService } from '../services/local-file.service';
import { LocalFile } from '../entities/local-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Instructor, Review, Training, M, AppDomain, LocalFile])],
  controllers: [
    CourseController,
    InstructorController,
    TrainingController,
    ModuleController,
    AppDomainController,
    ReviewController,
  ],
  providers: [
    CourseService,
    InstructorService,
    ModuleService,
    TrainingService,
    AppDomainService,
    ReviewService,
    SlugProvider,
    LocalFileService,
  ],
})
export class CourseModule {
}