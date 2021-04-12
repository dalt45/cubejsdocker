import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { ApplicationEvent } from './events.entity';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEvent])],
  controllers: [EventController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventModule {}
