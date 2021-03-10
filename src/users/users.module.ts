import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AdminModule)],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
