import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Admin } from './admin/admin.entity';
import { Landing } from './landing/landing.entity';
import { AuthModule } from './authUser/auth.module';
import { AuthAdminModule } from './authAdmin/auth.module';
import { LandingModule } from './landing/landing.module';
import { UniversityModule } from './university/university.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './authorization/roles.guard';
import { IdGuard } from './authorization/id.guard';
import { University } from './university/university.entity';
import { ApplicationModule } from './application/application.module';
import { StudentApplication } from './application/application.entity';

// 'mongodb://user:password@mongo:27017'
const dbHost: string = process.env.DB_HOST;
const dbPort: number = (process.env.DB_PORT as unknown) as number;
// const dbUsername: string = process.env.DB_USERNAME;
// const dbPassword: string = process.env.DB_PASSWORD;
const dbName: string = process.env.DB_NAME;

@Module({
  imports: [
    UsersModule,
    AdminModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: dbHost,
      port: dbPort,
      database: dbName,
      entities: [User, Admin, Landing, University, StudentApplication],
      synchronize: true,
    }),
    AuthModule,
    AuthAdminModule,
    LandingModule,
    UniversityModule,
    ApplicationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: IdGuard,
    },
  ],
})
export class AppModule {}
