import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingController } from './landing.controller';
import { LandingService } from './landing.service';
import { Landing } from './landing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Landing])],
  controllers: [LandingController],
  providers: [LandingService],
  exports: [LandingService],
})
export class LandingModule {}
