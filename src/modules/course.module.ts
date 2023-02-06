import { Module } from '@nestjs/common';
import { CourseService } from '../services';
import { CourseController } from '../controllers';
import { InstructorController } from '../controllers/instructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course, Instructor, Training } from '../entities';
import { SlugProvider } from '../providers/slug.provider';
import { InstructorService } from '../services/instructor.service';
import { Review } from '../entities/review.entity';
import { TrainingController } from '../controllers/training.controller';
import { ModuleController } from '../controllers/module.controller';
import { ModuleService } from '../services/module.service';
import { TrainingService } from '../services/Training.service';
import { Module as M } from '../entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Instructor, Review, Training, M])],
  controllers: [
    CourseController,
    InstructorController,
    TrainingController,
    ModuleController,
  ],
  providers: [
    CourseService,
    InstructorService,
    ModuleService,
    TrainingService,
    SlugProvider],
})
export class CourseModule {
}