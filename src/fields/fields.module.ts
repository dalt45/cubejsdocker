import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldController } from './fields.controller';
import { FieldService } from './fields.service';
import { UniversityModule } from '../university/university.module';
import { University } from '../university/university.entity';

@Module({
  imports: [UniversityModule, TypeOrmModule.forFeature([University])],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
