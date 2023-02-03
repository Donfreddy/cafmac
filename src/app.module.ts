import { ClassSerializerInterceptor, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { configService } from './config/config.service';
import { AuthModule, BlogModule, UserModule } from './modules';
import { LogsMiddleware } from './common/middlewares';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformationInterceptor } from './common/interceptors';
import { CourseModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),

    //
    AuthModule,
    BlogModule,
    UserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [{
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
