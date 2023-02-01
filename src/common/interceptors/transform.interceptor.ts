import { Reflector } from '@nestjs/core';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ResponseMessageKey } from '../decorators';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformationInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const responseMessage = this.reflector.get<string>(
      ResponseMessageKey,
      context.getHandler(),
    ) ?? '';

    return next.handle().pipe(
      map((data) => ({
        status_code: context.switchToHttp().getResponse().statusCode,
        message: responseMessage,
        data,
      })),
    );
  }
}
