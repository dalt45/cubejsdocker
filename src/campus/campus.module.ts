import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';
import { UniversityModule } from '../university/university.module';
import { University } from '../university/university.entity';

@Module({
  imports: [UniversityModule, TypeOrmModule.forFeature([University])],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [CampusService],
})
export class CampusModule {}
