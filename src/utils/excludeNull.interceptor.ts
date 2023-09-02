import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import recursivelyStripNullValues from './recursivelyStripNullValues';
import { Stream } from 'stream';

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map(value => {
        if (value instanceof Stream) {
          return value;
        }
        return recursivelyStripNullValues(value);
      }));
  }
}