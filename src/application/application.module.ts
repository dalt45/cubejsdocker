import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingModule } from 'src/landing/landing.module';
import { ApplicationController } from './application.controller';
import { StudentApplication } from './application.entity';
import { ApplicationService } from './application.services';

@Module({
  imports: [TypeOrmModule.forFeature([StudentApplication]), LandingModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
