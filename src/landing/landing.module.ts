import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingController } from './landing.controller';
import { LandingService } from './landing.service';
import { UniversityModule } from '../university/university.module';
import { University } from '../university/university.entity';

@Module({
  imports: [UniversityModule, TypeOrmModule.forFeature([University])],
  controllers: [LandingController],
  providers: [LandingService],
  exports: [LandingService],
})
export class LandingModule {}
