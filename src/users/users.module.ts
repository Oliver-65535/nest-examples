import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { UsersController } from './users.controller';
import { StripeModule } from '../stripe/stripe.module';
import { DatabaseFilesModule } from '../databaseFiles/databaseFiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DatabaseFilesModule,
    StripeModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
