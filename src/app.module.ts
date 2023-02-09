import { ClassSerializerInterceptor, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/config.service';
import { AuthModule, BlogModule, CourseModule, UserModule } from './modules';
import { LogsMiddleware } from './common/middlewares';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformationInterceptor } from './common/interceptors';
import { LocalFileService } from './services/local-file.service';
import LocalFilesController from './controllers/local-file.controller';
import { LocalFile } from './entities/local-file.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([LocalFile]),

    // Internal module
    AuthModule,
    BlogModule,
    UserModule,
    CourseModule,
  ],
  controllers: [AppController, LocalFilesController],
  providers: [
    LocalFileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogsMiddleware).forRoutes('*');
  }
}
