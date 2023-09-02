import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';

@Module({
  providers: [],
  exports: [],
  controllers: [OptimizeController]
})
export class OptimizeModule {}
