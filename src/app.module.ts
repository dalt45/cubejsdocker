import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Admin } from './admin/admin.entity';
import { AuthModule } from './authUser/auth.module';
import { AuthAdminModule } from './authAdmin/auth.module';

// 'mongodb://user:password@mongo:27017'
const dbHost: string = process.env.DB_HOST;
const dbPort: number = (process.env.DB_PORT as unknown) as number;
const dbUsername: string = process.env.DB_USERNAME;
const dbPassword: string = process.env.DB_PASSWORD;

@Module({
  imports: [
    UsersModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: dbHost,
      port: dbPort,
      username: dbUsername,
      password: dbPassword,
      entities: [User, Admin],
      synchronize: true,
    }),
    AuthModule,
    AuthAdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
