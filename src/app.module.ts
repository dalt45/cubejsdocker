import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity'

//'mongodb://user:password@mongo:27017'
@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type:'mongodb',
    host: 'mongo',
    port:27017,
    username:'user',
    password:'password',
    entities:[User],
    synchronize: true

  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
