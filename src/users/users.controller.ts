import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  registerUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.register(createUserDto);
  }

  @Get()
  getHello(): string {
    return this.userService.test();
  }
}
